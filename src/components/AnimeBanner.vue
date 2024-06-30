<template>
  <div class="anime-banner">
    <div class="banner-content">
      <h1>Willkommen im Anime-Forum</h1>
      <p>Diskutiere über deine Lieblings-Animes, teile Fan-Art und vieles mehr!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimeBanner'
}
</script>

<style scoped>
.anime-banner {
  background-image: url('@/assets/anime-banner.jpg'); /* Pfad zu deinem Bild */
  background-size: cover;
  background-position: center;
  height: 300px; /* Höhe des Banners */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
}

.banner-content {
  background: rgba(0, 0, 0, 0.6); /* Halbtransparenter Hintergrund */
  padding: 20px;
  border-radius: 10px;
}

.banner-content h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.banner-content p {
  font-size: 1.2rem;
}
</style>
