const Controller = require('egg').Controller

class searchController extends Controller {
    async search(){
        const ctx=this.ctx
        let {type='search',city_id,keyword}=ctx.request.query
        if(!keyword){
            ctx.body={
                name: 'ERROR_QUERY_TYPE',
                    message: '缺少关键词',
            }
            return
        }else if(isNaN(city_id)){
            try {
                
            } catch (err) {
                
            }
        }

        
    }

}

module.exports = searchController