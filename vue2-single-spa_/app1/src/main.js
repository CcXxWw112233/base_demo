import Vue from 'vue'
import App from './App.vue'
import singleSpaVue from "single-spa-vue"
import router from './router'

Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
//   router,
// }).$mount('#app')

// 这里均是在main.js文件中进行的，main.js文件中的其他的内容这里省略， 大家可以具体进行代码拆分
const options = {   // vue的配置参数
  el: "#vue",
  render: h => h(App),
  router
}
const vueLifeCycles = singleSpaVue({
  Vue,
  appOptions: options
})
export const bootstrap = vueLifeCycles.bootstrap;
export const mount = vueLifeCycles.mount;
export const unmount = vueLifeCycles.unmount;
export default vueLifeCycles;