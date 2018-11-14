// import Vue from 'vue'
// import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
    adminInfo: {
        avatar: 'default.jpg'
    }
}

const mutations = {
    saveAdminInfo(state, adminInfo) {
        state.adminInfo = adminInfo
    }
}

const actions = {
    async getAdminData({ commit }) {
        try {
            const res = await getAdminInfo()
            if (res.status == 1) {
                commit('saveAdminInfo', res.data)
            } else {
                throw new Error(res)
            }
        } catch (err) {
            console.log('请先登录')
        }
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
})