import axios from 'axios';

<template>
  <br>
<h1>Posts</h1>
  <button type="button">My posts</button>
  <button type="button">My comments</button>
</template>

<script>
import axios from 'axios'

axios.get('http://localhost:8080')
  .then(function (response) {
    // handle success
    // console.log("response")
    console.log(response)
    // .value = response.data
  })
export default {
  name: 'Post'
}
</script>

<style scoped>

</style>
