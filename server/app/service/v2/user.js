const Service = require('egg').Service
const crypto = require('crypto')
const dtime = require('moment')

class UserService extends Service {
    async login() {
        const ctx = this.ctx
        const cap = ctx.cookies.get('cap')
        const fields = ctx.request.body

        if (!cap) {
            console.log('验证码失效', cap)
            ctx.body = {
                status: 0,
                type: 'ERROR_CAPTCHA',
                message: '验证码失效',
            }
            return
        }

        const { username, password, captcha_code } = fields;
        try {
            if (!username) {
                throw new Error('用户名参数错误');
            } else if (!password) {
                throw new Error('密码参数错误');
            } else if (!captcha_code) {
                throw new Error('验证码参数错误');
            }
        } catch (err) {
            console.log('登陆参数错误', err);
            ctx.body = {
                status: 0,
                type: 'ERROR_QUERY',
                message: err.message,
            }
            return
        }
        if (cap.toString() !== captcha_code.toString()) {
            ctx.body = {
                status: 0,
                type: 'ERROR_CAPTCHA',
                message: '验证码不正确',
            }
            return
        }

        const newpassword = this.encryption(password);
        try {
            const user = await ctx.model.User.findOne({ username });
            if (!user) {
                const user_id = await ctx.helper.getId('user_id');
                const cityInfo = await ctx.service.address.guessPosition(ctx.request.body);
                const registe_time = dtime().format('YYYY-MM-DD HH:mm');
                const newUser = { username, password: newpassword, user_id };
                const newUserInfo = { username, user_id, id: user_id, city: cityInfo.city, registe_time, };
                try {
                    await ctx.model.User.create(newUser);
                    const userinfo = await ctx.model.UserInfo.create(newUserInfo);
                    ctx.session.user_id = user_id;
                    ctx.body = userinfo;
                } catch (err) {
                    console.log(err)
                }
            } else if (user.password.toString() !== newpassword.toString()) {
                console.log('用户登录密码错误')
                ctx.body = {
                    status: 0,
                    type: 'ERROR_PASSWORD',
                    message: '密码错误',
                }
                return
            } else {
                ctx.session.user_id = user.user_id;
                const userinfo = await ctx.model.UserInfo.findOne({ user_id: user.user_id }, '-_id');
                ctx.body = userinfo
            }
        } catch (err) {
            console.log('用户登陆失败', err);
            ctx.body = {
                status: 0,
                type: 'SAVE_USER_FAILED',
                message: '登陆失败',
            }
        }



    }

    async getInfo() {
        const ctx = this.ctx
        const sid = ctx.session.user_id;
        const qid = ctx.query.user_id;
        const user_id = sid || qid;

        if (!user_id || !Number(user_id)) {
            console.log('获取用户信息的参数user_id无效', user_id)
            ctx.body = {
                status: 0,
                type: 'GET_USER_INFO_FAIELD',
                message: '通过session获取用户信息失败',
            }
            return
        }

        try {
            const userinfo = await ctx.model.UserInfo.findOne({ user_id }, '-_id');
            ctx.body = userinfo
        } catch (err) {
            console.log('通过session获取用户信息失败', err);
            ctx.body = {
                status: 0,
                type: 'GET_USER_INFO_FAIELD',
                message: '通过session获取用户信息失败',
            }
        }
    }

    async getInfoById() {}

    async signout() {
        const ctx = this.ctx
        delete ctx.session.user_id;
        ctx.body = {
            status: 1,
            message: '退出成功'
        }
    }

    async chanegPassword() {}

    async getUserList() {}

    async getUserCount() {}

    async updateAvatar() {}

    async getUserCity() {}

    encryption(password) {
        const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newpassword
    }
    Md5(password) {
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }
}

module.exports = UserService