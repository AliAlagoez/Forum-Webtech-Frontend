<template>
  <div>
    <h1>Posts</h1>
    <button type="button" @click="fetchMyPosts">My posts</button>
    <button type="button" @click="fetchMyPostsFromRender">My comments</button>
    <h2>New Post</h2>
    <form @submit.prevent="submitPost">
      <input v-model="newPost.title" type="text" placeholder="Enter new post title" required />
      <input v-model="newPost.content" type="text" placeholder="Enter new post content" required />
      <input v-model="newPost.author" type="text" placeholder="Enter author" required />
      <button type="submit">Submit</button>
    </form>
    <div v-if="posts.length">
      <h2>My Posts:</h2>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <p><strong>Author:</strong> {{ post.author }}</p>
          <p><strong>Created At:</strong> {{ new Date(post.createdAt).toLocaleString() }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'

const API_BASE_URL = 'http://localhost:8080/Post/post' // Base URL for local
const RENDER_API_BASE_URL = 'https://forum-webtech.onrender.com/Post/post' // Base URL for Render

export default defineComponent({
  name: 'Post',
  data () {
    return {
      posts: [],
      newPost: {
        title: '',
        content: '',
        author: ''
      }
    }
  },
  methods: {
    fetchMyPosts () {
      axios.get(API_BASE_URL)
        .then(response => {
          this.posts = response.data
        })
        .catch(error => {
          console.error('There was an error fetching the posts!', error)
        })
    },
    fetchMyPostsFromRender () {
      axios.get(RENDER_API_BASE_URL)
        .then(response => {
          this.posts = response.data
        })
        .catch(error => {
          console.error('There was an error fetching the posts from Render!', error)
        })
    },
    submitPost () {
      // Determine which URL to use based on condition
      const url = this.posts.length > 0 ? RENDER_API_BASE_URL : API_BASE_URL

      axios.post(url, this.newPost)
        .then(response => {
          console.log('Post submitted!', response)
          this.fetchMyPosts() // Always fetch from local after submission
          this.newPost.title = ''
          this.newPost.content = ''
          this.newPost.author = ''
        })
        .catch(error => {
          console.error('There was an error submitting the post!', error)
        })
    }
  },
  mounted () {
    this.fetchMyPosts()
  }
})
</script>

<style scoped>
</style>
