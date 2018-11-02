const Service = require('egg').Service;
const captchapng = require('captchapng')

class CaptchasService extends Service {
    async getCaptchas() {
        const ctx = this.ctx
        const cap = parseInt(Math.random() * 9000 + 1000);
        const p = new captchapng(80, 30, cap);
        p.color(0, 0, 0, 0);
        p.color(80, 80, 80, 255);
        const base64 = p.getBase64();
        ctx.cookies.set('cap', cap, { maxAge: 300000, httpOnly: true });
        console.log('cookies', ctx.cookies.get('cap'))
        ctx.body = {
            status: 1,
            code: 'data:image/png;base64,' + base64
        }
    }

}


module.exports = CaptchasService;