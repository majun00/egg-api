module.exports = (options, app) => {
    return async function(ctx, next) {
        const admin_id = ctx.session.admin_id;
        if (!admin_id || !Number(admin_id)) {
            ctx.body = {
                status: 0,
                type: 'ERROR_SESSION',
                message: '亲，您还没有登录',
            }
            return
        } else {
            const admin = await ctx.model.Admin.findOne({ id: admin_id });
            if (!admin || admin.status != 2) {
                ctx.body = {
                    status: 0,
                    type: 'HAS_NO_ACCESS',
                    message: '亲，您的权限不足',
                }
                return
            }
        }

        // 注意：中间件中调用 next 必须前置 await，否则后续中间件无法继续 await
        await next();
    };
};