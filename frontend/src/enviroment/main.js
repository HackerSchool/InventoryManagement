import Vue from 'vue'
import App from './App.vue'
import router from './router'
//Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

//Font awesome (icons)
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTools, faSignOutAlt, faWrench, faPlusCircle, faTimesCircle, faMinusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/*
//Flash messages
import FlashMessage from '@smartweb/vue-flash-message';
Vue.use(FlashMessage);
*/

// Font awesome (icons)
library.add(faTools, faSignOutAlt, faWrench, faPlusCircle, faTimesCircle, faMinusCircle, faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import '@mdi/font/css/materialdesignicons.css'


Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.prototype.$serverUrl = process.env.VUE_APP_APIURL || '/api'

new Vue({
	router,
	vuetify: new Vuetify(),
	render: h => h(App)
}).$mount('#app')