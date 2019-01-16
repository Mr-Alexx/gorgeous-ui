import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from './Demo.vue'
// 自定义组件库
import GorgeousUI from './../src/index'
import './../src/styles/theme-chalk/index.scss'

Vue.config.productionTip = false

Vue.use(GorgeousUI)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/button' },
    { path: '/color', component: () => import('./demos/color.vue') },
    { path: '/button', component: () => import('./demos/button.vue') },
    { path: '/test', component: () => import('./demos/test.vue') },
    { path: '/grid', component: () => import('./demos/grid.vue') },
    { path: '/form', component: () => import('./demos/form.vue') },
    { path: '/input', component: () => import('./demos/input.vue') },
    { path: '/tree', component: () => import('./demos/tree.vue') },
    { path: '/checkbox', component: () => import('./demos/checkbox.vue') }
  ]
})

new Vue({
  router,
  render: h => h(Demo)
}).$mount('#app')
