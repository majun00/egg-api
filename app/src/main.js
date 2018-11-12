import Vue from 'vue'
// import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store'
import { routerMode } from './config/env'
import './config/rem'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: routerMode,
    strict: process.env.NODE_ENV !== 'production',
    scrollBehavior(to, from, savePosition) {
        if (savePosition) {
            return savePosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savePosition = document.body.scrollTop
            }
            return {
                x: 0,
                y: to.meta.savePosition || 0
            }
        }
    }
})

new Vue({
    el: '#app',
    router,
    store,
    // components: { App },
    // template: '<App/>'
})