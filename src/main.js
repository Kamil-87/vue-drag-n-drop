import Vue from 'vue'
import App from './App.vue'
import router from './router'
import formattedText from "./filters/maxLengthText.filter"
import './assets/styles/style.css'

Vue.filter('formattedText', formattedText)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
