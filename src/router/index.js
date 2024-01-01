import {createRouter,createWebHistory} from 'vue-router'

import LandingPage from '../Views/LandingPage.vue'
import CreateInvoicePage from '../Views/CreateInvoicePage.vue'
import EditInvoicePage from '../Views/EditInvoicePage.vue'
import HistoryPage from '../Views/HistoryPage.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },

  {
    path: '/create-invoice',
    name: 'create-invoice',
    component: CreateInvoicePage
  },

  {
    path: '/edit-invoice/:id',
    name: 'edit-invoice',
    component: EditInvoicePage
  },

  {
    path: '/history',
    name: 'History-Page',
    component: HistoryPage
  }
]

const router = createRouter({
 
  history:createWebHistory(import.meta.env.BASE_URL),
  routes:routes
});

export default router;