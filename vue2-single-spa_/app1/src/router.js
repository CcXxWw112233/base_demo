import Vue from "vue"
import VueRouter from "vue-router"
import About from './components/HelloWorld.vue'
const routes = [{
  path: "/app1/about",
  name: "about",
  component: About
}]
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

export default router