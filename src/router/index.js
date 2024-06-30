import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Post from '../views/Post.vue'
import Genre from '../views/Genre.vue'
import Comment from '../views/Comment.vue' // Import der Comment-Komponente hinzugefügt

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
    path: '/comment',
    name: 'Comment',
    component: Comment // Route für die Comment-Komponente hinzugefügt
  },
  {
    path: '/genre/:genre', // Dynamischer Pfad für Genre
    name: 'Genre',
    component: Genre
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes
})

export default router
