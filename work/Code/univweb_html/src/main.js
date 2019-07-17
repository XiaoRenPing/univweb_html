import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { get, post } from './utils/http'
import { filterTime, filterStrTime, thousands } from './utils/filterTime.js'
import ElementUI from 'element-ui'
import BaiduMap from 'vue-baidu-map'
import { checkAuth } from './utils/auth.js'
import myAlert from './assets/js/myAlert.js'
import toast from './assets/js/toast.js'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css'
import './assets/css/reset.css'

Vue.component(CollapseTransition.name, CollapseTransition)

Vue.prototype.$myAlert = myAlert
Vue.prototype.$toast = toast
Vue.prototype.$post = post
Vue.prototype.$get = get

Vue.use(ElementUI)
Vue.use(BaiduMap, {
    ak: 'f7GpjqXB2NkRGlzqIqywWTbo'
})
Vue.prototype.$checkAuth = checkAuth
Vue.filter('filterTime', filterTime)
Vue.filter('filterStrTime', filterStrTime)
Vue.filter('thousands', thousands)
Vue.filter('filterCommon', function (id, list, value, label) {
    for (let element of list) {
        if (element[value || 'value'] - 0 === id - 0) {
            return element[label || 'label']
        }
    }
})
Vue.filter('filterRegion', function (value) {
    let list = JSON.parse(localStorage.regionList)
    let name = value
    list.forEach(i => {
        if (i.regionId === value) {
            name = i.regionName
        }
    })
    return name
})

Vue.config.productionTip = false
const vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
export default vm
