<template>
  <div>
    <h1>Posts</h1>
    <button type="button" @click="toggleMyPosts" class="btn">My posts</button>
    <h2>New Post</h2>
    <form @submit.prevent="submitPost">
      <input v-model="newPost.title" type="text" placeholder="Enter new post title" required />
      <input v-model="newPost.content" type="text" placeholder="Enter new post content" required />
      <input v-model="newPost.author" type="text" placeholder="Enter author" required />
      <button type="submit" class="btn">Submit</button>
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
          <th>Rate</th>
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
            <button v-if="editPostId !== post.id" @click="enableEditPost(post)" class="btn">Edit</button>
            <button v-else @click="saveEditPost(post.id)" class="btn">Save</button>
            <button v-if="editPostId === post.id" @click="cancelEditPost" class="btn">Cancel</button>
            <button @click="confirmDeletePost(post.id)" class="btn btn-delete">Delete</button>
            <button @click="toggleFavorite(post)" :class="['btn', isFavorite(post) ? 'btn-secondary' : 'btn-primary']">
              <span :class="{'text-yellow-400': isFavorite(post)}">★</span>
            </button>
          </td>
          <td>
            <button v-if="!hasVoted(post.id, 'up')" @click="votePost(post.id, 'up')" class="btn">👍</button>
            <button v-if="!hasVoted(post.id, 'down')" @click="votePost(post.id, 'down')" class="btn">👎</button>
            <span v-if="hasVoted(post.id, 'up')">👍 Upvoted</span>
            <span v-if="hasVoted(post.id, 'down')">👎 Downvoted</span>
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
      votedPosts: [], // Array to store IDs of posts that user has voted on
      favorites: [] // Array to store favorite posts
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
    confirmDeletePost (postId) {
      if (confirm('Are you sure you want to delete this post?')) {
        this.deletePost(postId)
      }
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
      axios.put(url, { type })
        .then(response => {
          console.log('Vote recorded!', response.data)
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
    },
    toggleFavorite (post) {
      const index = this.favorites.findIndex(fav => fav.id === post.id)
      if (index === -1) {
        this.favorites.push(post)
        console.log('Added to favorites:', post)
      } else {
        this.favorites.splice(index, 1)
        console.log('Removed from favorites:', post)
      }
      this.saveFavorites()
    },
    isFavorite (post) {
      return this.favorites.some(fav => fav.id === post.id)
    },
    saveFavorites () {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
    loadFavorites () {
      const favorites = localStorage.getItem('favorites')
      if (favorites) {
        this.favorites = JSON.parse(favorites)
      }
    }
  },
  mounted () {
    this.fetchMyPosts()
    this.loadFavorites()
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

.btn {
  padding: 8px 12px;
  margin: 4px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8; /* Light gray, almost white */
  color: #333;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.btn:hover {
  background-color: #e0e0e0; /* Slightly darker gray for hover effect */
}

.btn-primary {
  background-color: #ffd700;
  color: #333;
}

.btn-primary:hover {
  background-color: #f0c500;
}

.btn-secondary {
  background-color: #f8f8f8;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-delete {
  background-color: #f8f8f8;
  color: #333;
}

.btn-delete:hover {
  background-color: #c82333;
  color: #fff;
}

.text-yellow-400 {
  color: #ffd700; /* Gelbe Farbe für den Stern */
}
</style>
