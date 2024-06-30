import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Post from '../views/Post.vue'
import Genre from '../views/Genre.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/post',
    name: 'Post',
    component: Post
  },
  {
    path: '/genre/:genre',
    name: 'Genre',
    component: Genre
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes
})

export default router
