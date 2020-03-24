import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'

import SirModel from './views/SirModel.vue'
import SeirModel from './views/SeirModel.vue'
import CamasUCI from './views/CamasUCI.vue'
import Evolution from './views/Evolution.vue'
import Somos from './views/Somos.vue'
import Privacidad from './views/Privacidad.vue'

import i18n from './plugins/i18n';

//https://medium.com/spemer/using-axios-in-vue-js-17f186756a8b
Vue.prototype.$http = axios

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/'          , component: SirModel },
    { path: '/sir'       , component: SirModel },
    { path: '/seir'      , component: SeirModel },
    { path: '/camas'     , component: CamasUCI },
    { path: '/evolucion' , component: Evolution },
    { path: '/somos'     , component: Somos },
    { path: '/privacidad', component: Privacidad },
  ]
})

new Vue({
    i18n,
    router,
    render: h => h(App)
}).$mount('#app');
