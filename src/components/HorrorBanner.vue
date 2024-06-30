<template>
  <div class="genre-banner horror-banner">
    <div class="banner-content">
      <h1>Willkommen im Horror-Forum</h1>
      <p>Begib dich in düstere Welten voller Schrecken und Spannung!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorrorBanner'
}
</script>

<style scoped>
.genre-banner {
  background-size: cover;
  background-position: center;
  height: 300px; /* Höhe des Banners */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
}

.horror-banner {
  background-image: url('@/assets/anime-banner.jpg');
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
