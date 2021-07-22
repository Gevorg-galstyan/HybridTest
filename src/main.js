import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import VueUid from 'vue-uid';
import { routes } from '@/router/routes';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueUid);

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
