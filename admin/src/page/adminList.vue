<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="user_name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="create_time" label="注册日期" width="220">
                </el-table-column>
                <el-table-column prop="city" label="地址" width="180">
                </el-table-column>
                <el-table-column prop="admin" label="权限">
                </el-table-column>
            </el-table>

            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import { adminList, adminCount } from '@/api/getData'
export default {
    data() {
        return {
            tableData: [],
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
            // currentRow:null
        }
    },
    components: {
        headTop,
    },
    created() {
        this.initData()
    },
    methods: {
        async initData() {
            try {
                const res = await adminList({ offset: this.offset, limit: this.limit })
                if (res.status == 1) {
                    // this.tableData=[]
                    res.data.forEach(item => {
                        const tableItem = {
                            create_time: item.create_time,
                            user_name: item.username,
                            admin: item.admin,
                            city: item.city
                        }
                        this.tableData.push(tableItem)
                    })
                } else {
                    throw new Error(res.message)
                }
            } catch (err) {
                console.log('获取数据失败', err)
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1) * limit;
            this.getAdmin()
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
    }
}
</script>

<style lang="less">
@import '../style/mixin';
.table_container {
  padding: 20px;
}
</style>


