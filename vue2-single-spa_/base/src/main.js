import Vue from 'vue'
import App from './App.vue'
import singleSpa from './single.config.js'
import router from './router'
Vue.config.productionTip = false
singleSpa.start()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
