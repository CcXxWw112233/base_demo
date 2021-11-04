import Vue from "vue"
import VueRouter from "vue-router"
const routes = [{
  path: "/",
  name: "base"
}]
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

export default router