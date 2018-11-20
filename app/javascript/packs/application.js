/* eslint no-console:0 */
import Vue from 'vue'
import store from '../store'
import App from '../app.vue'
import ActionCable from 'actioncable'

const cable = ActionCable.createConsumer('/cable')
Vue.prototype.$cable = cable

document.addEventListener('DOMContentLoaded', () => {
  const el = document.body.appendChild(document.createElement('hello'))
  const app = new Vue({
    el,
    store,
    render: h => h(App)
  })
})
