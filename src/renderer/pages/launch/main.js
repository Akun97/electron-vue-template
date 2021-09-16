import Vue from 'vue'
import '@/utils/flexible'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/element-variables.scss'
import App from './App'
import router from './router'
import store from '@/store'
import { get, post, put, del, apis } from '@/services'

Vue.use(ElementUI)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$put = put
Vue.prototype.$del = del
Vue.prototype.$apis = apis
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
