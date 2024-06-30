<template>
  <div class="genre-banner fantasy-banner">
    <div class="banner-content">
      <h1>Willkommen im Fantasy-Forum</h1>
      <p>Entdecke die Welt der Magie und Abenteuer!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FantasyBanner'
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

.fantasy-banner {
  background-image: url('@/assets/fantasy-banner.jpg'); /* Pfad zu deinem Fantasy-Banner */
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
