import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import  router from './router/index'
import store from './store'
import Print from 'vue-print-nb'
import echarts from "echarts";

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(Print);

router.beforeEach((to,from,next)=>{
  console.log(to);
  if(localStorage.getItem('token') || to.path === "/login"){
    next();
  }else {
    next({
      path:'/login'
    })
  }
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
