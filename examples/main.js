import Vue from 'vue'
import App from './App.vue'
// 自定义组件库
import GorgeousUI from './../src/index'

Vue.config.productionTip = false

Vue.use(GorgeousUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
