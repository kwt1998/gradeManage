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

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
