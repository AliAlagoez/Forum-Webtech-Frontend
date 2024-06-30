<template>
  <div class="home">
    <div class="content">
      <img class="sasuke-image" alt="Another Image" src="../assets/sasukee.png" width="300" height="auto">
      <img class="logo-image" alt="FF Logo" src="../assets/Fictionforumlogoss.png" width="500" height="auto">
      <img class="naruto-image" alt="Naruto Image" src="../assets/naruto.png" width="300" height="auto">
    </div>
    <HelloWorld msg=""/>
  </div>
</template>

<script>
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
  position: relative;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
}

.sasuke-image {
  position: absolute;
  bottom: 80px; /* Adjust this value to control how much the image protrudes from the bottom */
  left: -80px; /* Adjust this value to control how much the image protrudes from the left */
  width: 300px; /* Increased size */
  transform: rotate(90deg); /* Rotate 90 degrees to the right */
}

.logo-image {
  margin: auto;
}

.naruto-image {
  position: absolute;
  top: 20px; /* Adjusted to be below the navbar */
  right: -100px; /* Adjust this value to control how much the image protrudes from the right */
  width: 300px; /* Increased size */
  transform: rotate(-90deg); /* Rotate 90 degrees to the left */
}
</style>
