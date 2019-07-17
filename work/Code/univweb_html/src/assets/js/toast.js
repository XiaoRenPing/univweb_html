import Vue from 'vue'
import toast from '../../components/Toast.vue'

let ToastConstructor = Vue.extend(toast)

let myToast = text => {
    let confirmDom = new ToastConstructor({
        el: document.createElement('div')
    })
    document.body.appendChild(confirmDom.$el)
    confirmDom.toast = true
    text.type = text.type || 'success'
    confirmDom.text = text
    setTimeout(() => {
        if (!confirmDom.toast) {
            document.body.removeChild(confirmDom.$el)
            return
        }
        confirmDom.toast = false
        setTimeout(() => {
            document.body.removeChild(confirmDom.$el)
            text.callback && text.callback()
        }, 500)
    }, 2000)
}

export default myToast
