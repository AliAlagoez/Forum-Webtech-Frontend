<template>
  <div>
    <h1>Posts</h1>
    <button type="button" @click="toggleMyPosts">My posts</button>
    <h2>New Post</h2>
    <form @submit.prevent="submitPost">
      <input v-model="newPost.title" type="text" placeholder="Enter new post title" required />
      <input v-model="newPost.content" type="text" placeholder="Enter new post content" required />
      <input v-model="newPost.author" type="text" placeholder="Enter author" required />
      <button type="submit">Submit</button>
    </form>
    <div v-if="showPosts && posts.length">
      <h2>My Posts:</h2>
      <table>
        <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Author</th>
          <th>Created At</th>
          <th>Actions</th>
          <th>Upvotes</th>
          <th>Downvotes</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td v-if="editPostId !== post.id">{{ post.title }}</td>
          <td v-else><input v-model="editPost.title" type="text" /></td>
          <td v-if="editPostId !== post.id">{{ post.content }}</td>
          <td v-else><input v-model="editPost.content" type="text" /></td>
          <td>{{ post.author }}</td>
          <td>{{ new Date(post.createdAt).toLocaleString() }}</td>
          <td>
            <button v-if="editPostId !== post.id" @click="enableEditPost(post)">Edit</button>
            <button v-else @click="saveEditPost(post.id)">Save</button>
            <button v-if="editPostId === post.id" @click="cancelEditPost">Cancel</button>
            <button @click="deletePost(post.id)">Delete</button>
          </td>
          <td>{{ post.upvotes }}</td>
          <td>{{ post.downvotes }}</td>
          <td>
            <button v-if="!hasVoted(post.id, 'up')" @click="votePost(post.id, 'up')">Upvote</button>
            <button v-if="!hasVoted(post.id, 'down')" @click="votePost(post.id, 'down')">Downvote</button>
            <span v-if="hasVoted(post.id, 'up')">Upvoted</span>
            <span v-if="hasVoted(post.id, 'down')">Downvoted</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'

const RENDER_API_BASE_URL = 'https://forum-webtech.onrender.com/Post/post'

export default defineComponent({
  name: 'Post',
  data () {
    return {
      posts: [],
      newPost: {
        title: '',
        content: '',
        author: ''
      },
      editPost: {
        title: '',
        content: ''
      },
      editPostId: null,
      showPosts: false,
      votedPosts: [] // Array to store IDs of posts that user has voted on
    }
  },
  methods: {
    fetchMyPosts () {
      axios.get(RENDER_API_BASE_URL)
        .then(response => {
          this.posts = response.data
        })
        .catch(error => {
          console.error('There was an error fetching the posts!', error)
        })
    },
    submitPost () {
      axios.post(RENDER_API_BASE_URL, this.newPost)
        .then(response => {
          console.log('Post submitted to render server!', response)
          this.fetchMyPosts()
        })
        .catch(error => {
          console.error('There was an error submitting the post to the render server!', error)
        })

      this.newPost.title = ''
      this.newPost.content = ''
      this.newPost.author = ''
    },
    toggleMyPosts () {
      this.showPosts = !this.showPosts
      if (this.showPosts && this.posts.length === 0) {
        this.fetchMyPosts()
      }
    },
    enableEditPost (post) {
      this.editPostId = post.id
      this.editPost.title = post.title
      this.editPost.content = post.content
    },
    saveEditPost (postId) {
      const url = `${RENDER_API_BASE_URL}/${postId}`
      axios.put(url, this.editPost)
        .then(response => {
          console.log('Post updated!', response)
          this.fetchMyPosts()
          this.editPostId = null
          this.editPost.title = ''
          this.editPost.content = ''
        })
        .catch(error => {
          console.error('There was an error updating the post!', error)
        })
    },
    cancelEditPost () {
      this.editPostId = null
      this.editPost.title = ''
      this.editPost.content = ''
    },
    deletePost (postId) {
      const url = `${RENDER_API_BASE_URL}/${postId}`
      axios.delete(url)
        .then(response => {
          console.log('Post deleted from render server!', response)
          this.fetchMyPosts()
        })
        .catch(error => {
          console.error('There was an error deleting the post from the render server!', error)
        })
    },
    votePost (postId, type) {
      const url = `${RENDER_API_BASE_URL}/${postId}/vote`
      axios.post(url, { type })
        .then(response => {
          console.log('Vote recorded!', response)
          // Update the post's vote counts
          const post = this.posts.find(post => post.id === postId)
          if (type === 'up') {
            post.upvotes++
          } else if (type === 'down') {
            post.downvotes++
          }
          // Store that this post has been voted on
          this.votedPosts.push({
            postId,
            type
          })
        })
        .catch(error => {
          console.error('There was an error recording the vote!', error)
        })
    },
    hasVoted (postId, type) {
      return this.votedPosts.some(vote => vote.postId === postId && vote.type === type)
    }
  },
  mounted () {
    this.fetchMyPosts()
  }
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
