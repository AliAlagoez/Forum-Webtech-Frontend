<template>
  <div class="home">
    <img alt="FF Logo" src="../assets/Fictionforumlogoss.png" width="500" height="auto"  >
    <h1>Welcome to Fiction Forum!</h1>
    <HelloWorld msg=""/>
  </div>
</template>

<script>

// @ is an alsias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  text-align: center;
}

.content {
  display: flex;
  align-items: center;
}

.content img {
  margin-right: 20px;
}
</style>
