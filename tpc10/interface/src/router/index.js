import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Página Principal',
    component: () => import('../views/Home.vue')

  },
  {
    path: '/filmes',
    name: 'Página Filmes',
    component: () => import('../views/Principal.vue')
  },
  {
    path: '/filmes/:idFilme',
    name: 'Consulta Filme',
    component: () => import('../views/Consulta.vue')
  },
  {
    path: '/atores',
    name: 'Página Atores',
    component: () => import('../views/Principal2.vue')
  },
  {
    path: '/atores/:idAtor',
    name: 'Consulta Ator',
    component: () => import('../views/Consulta2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
