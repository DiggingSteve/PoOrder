// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import Vuex from 'vuex'
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';    // 使用 CSS
import vueScroll from 'vue-scroll'
import VueI18n from 'vue-i18n'
import store from "./store"
import com from './common/common.js'
//import axios from 'axios'
import axios from './common/http.js'

// 语言包
import {cn} from './language/cn.js'
import {en} from './language/en.js'

Vue.prototype.Global=com;
Vue.prototype.$axios=axios;

Vue.use(VueI18n);
//Vue.use(iView);
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(vueScroll)
Vue.config.productionTip = false


　  const i18n = new VueI18n({
　　  locale: 'Chinese', // 语言标识
　　   messages:{
  　　  Chinese :cn,
   　　 English : en
 　　  }
　　})



new Vue({
  el: '#app',
   i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
})
