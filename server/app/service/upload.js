const Service = require('egg').Service;
const path = require('path')
const fs = require('fs')
// const gm = require('gm')

// const qiniu = require('qiniu')
// qiniu.conf.ACCESS_KEY = 'Ep714TDrVhrhZzV2VJJxDYgGHBAX-KmU1xV1SQdS';
// qiniu.conf.SECRET_KEY = 'XNIW2dNffPBdaAhvm9dadBlJ-H6yyCTIJLxNM_N6';

class UploadService extends Service {
    async upload() {
        const ctx = this.ctx
        const type = ctx.params
        try {
            const image_path = await this.getPath()
            // const image_path=await this.qiniu()
            ctx.body = {
                status: 1,
                image_path
            }
        } catch (err) {
            console.log('上传图片失败', err);
            ctx.body = {
                status: 0,
                type: 'ERROR_UPLOAD_IMG',
                message: '上传图片失败'
            }
        }
    }

    async getPath() {
        const ctx = this.ctx
        let files = ctx.request.files[0]
        let img_id;

        try {
            img_id = await ctx.helper.getId('img_id')
        } catch (err) {
            console.log('获取图片id失败');
            fs.unlinkSync(files.filepath);
            // reject('获取图片id失败');
        }

        const extname = path.extname(files.filename)

        if (!['.jpg', '.jpge', '.png'].includes(extname)) {
            fs.unlinkSync(files.filepath);
            res.send({
                status: 0,
                type: 'ERROR_EXTNAME',
                message: '文件格式错误'
            })
            // reject('上传失败');
            return
        }

        const hashName = (new Date().getTime() + Math.ceil(Math.random() * 10000)).toString(16) + img_id
        const fullName = hashName + extname
        const repath = './app/public/temp/' + fullName

        try {
            // fs.renameSync(files.filepath, repath)
            let readStream = fs.createReadStream(files.filepath)
            let writeStream = fs.createWriteStream(repath)
            readStream.pipe(writeStream);
            readStream.on('end', function() {
                fs.unlinkSync(files.filepath);
            });

            // gm(repath).resize(200, 200, '!')
            //     .write(repath, (err) => {
            //         // resolve(fullName)
            //         console.log('gm', err, fullName)
            //         // return fullName
            //     })

            return fullName
        } catch (err) {
            console.log('保存图片失败', err);
            if (fs.existsSync(repath)) {
                fs.unlinkSync(repath);
            } else {
                fs.unlinkSync(files.filepath);
            }
            // reject('保存图片失败')
        }
    }

    // async qiniu(req, type = 'default') {
    //     return new Promise((resolve, reject) => {
    //         const form = formidable.IncomingForm();
    //         form.uploadDir = './public/img';
    //         form.parse(req, async (err, fields, files) => {
    //             let img_id;
    //             try {
    //                 img_id = await this.getId('img_id');
    //             } catch (err) {
    //                 console.log('获取图片id失败');
    //                 fs.unlinkSync(files.file.path);
    //                 reject('获取图片id失败')
    //             }
    //             const hashName = (new Date().getTime() + Math.ceil(Math.random() * 10000)).toString(16) + img_id;
    //             const extname = path.extname(files.file.name);
    //             const repath = './public/img/' + hashName + extname;
    //             try {
    //                 const key = hashName + extname;
    //                 await fs.rename(files.file.path, repath);
    //                 const token = this.uptoken('node-elm', key);
    //                 const qiniuImg = await this.uploadFile(token.toString(), key, repath);
    //                 fs.unlinkSync(repath);
    //                 resolve(qiniuImg)
    //             } catch (err) {
    //                 console.log('保存至七牛失败', err);
    //                 fs.unlinkSync(files.file.path)
    //                 reject('保存至七牛失败')
    //             }
    //         });

    //     })
    // }
    // uptoken(bucket, key) {
    //     var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    //     return putPolicy.token();
    // }
    // uploadFile(uptoken, key, localFile) {
    //     return new Promise((resolve, reject) => {
    //         var extra = new qiniu.io.PutExtra();
    //         qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
    //             if (!err) {
    //                 resolve(ret.key)
    //             } else {
    //                 console.log('图片上传至七牛失败', err);
    //                 reject(err)
    //             }
    //         });

    //     })
    // }



}

module.exports = UploadService;