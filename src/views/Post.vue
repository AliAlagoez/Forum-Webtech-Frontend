<template>
  <div>
    <h1>Posts</h1>
    <button type="button" @click="fetchMyPosts">My posts</button>
    <button type="button" @click="fetchMyPostsFromRender">My comments</button>
    <div v-if="posts.length">
      <h2>My Posts:</h2>
      <ul>
        <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Post',
  data () {
    return {
      posts: []
    }
  },
  methods: {
    fetchMyPosts () {
      axios.get('http://localhost:8080/post')
        .then(response => {
          this.posts = response.data
        })
        .catch(error => {
          console.error('There was an error fetching the posts from localhost!', error)
        })
    },
    fetchMyPostsFromRender () {
      axios.get('https://forum-webtech.onrender.com')
        .then(response => {
          this.posts = response.data
        })
        .catch(error => {
          console.error('There was an error fetching the posts from Render!', error)
        })
    }
  }
}
</script>

<style scoped>
</style>
