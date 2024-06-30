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
            <button @click="toggleFavorite(post)" :class="['btn', isFavorite(post) ? 'btn-primary' : 'btn-secondary']">
              <span :class="{'text-yellow-400': isFavorite(post), 'text-black': isFavorite(post)}">★</span>
            </button>
          </td>
          <td>
            <button @click="votePost(post.id, 'up')" :class="['btn', hasVoted(post.id, 'up') ? 'btn-upvoted' : '']">👍</button>
            <button @click="votePost(post.id, 'down')" :class="['btn', hasVoted(post.id, 'down') ? 'btn-downvoted' : '']">👎</button>
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
      const existingVote = this.votedPosts.find(vote => vote.postId === postId)
      if (existingVote) {
        // If user already voted the same type, remove the vote
        if (existingVote.type === type) {
          this.votedPosts = this.votedPosts.filter(vote => vote.postId !== postId)
        } else {
          // If user voted differently before, change the vote type
          existingVote.type = type
        }
      } else {
        this.votedPosts.push({
          postId,
          type
        })
      }
      // Save votes to localStorage
      this.saveVotes()
      // Send vote to server (optional, can be moved out of this function)
      const url = `${RENDER_API_BASE_URL}/${postId}/vote`
      axios.put(url, { type })
        .then(response => {
          console.log('Vote recorded!', response.data)
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
    },
    saveVotes () {
      localStorage.setItem('votedPosts', JSON.stringify(this.votedPosts))
    },
    loadVotes () {
      const votes = localStorage.getItem('votedPosts')
      if (votes) {
        this.votedPosts = JSON.parse(votes)
      }
    }
  },
  mounted () {
    this.fetchMyPosts()
    this.loadFavorites()
    this.loadVotes()
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

.text-black {
  color: #000; /* Schwarze Farbe für den Stern */
}

.text-yellow-400 {
  color: #ffd700; /* Yellow color for the star */
}

.btn-upvoted {
  background-color: #28a745; /* Green for upvote */
  color: white;
}

.btn-downvoted {
  background-color: #dc3545; /* Red for downvote */
  color: white;
}
</style>
