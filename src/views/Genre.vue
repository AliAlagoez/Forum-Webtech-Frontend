<template>
  <div class="genre-page">
    <component :is="genreBannerComponent"/> <!-- Dynamische Anzeige des Genre-Banners -->
    <div class="content">
      <h1>{{ genreTitle }}</h1>
      <p>{{ genreDescription }}</p>
      <div class="forum-topics">
        <h2>Beliebte Themen</h2>
        <ul>
          <li><a href="#">Neue Veröffentlichungen</a></li>
          <li><a href="#">Klassiker</a></li>
          <li><a href="#">Diskussionen über Charaktere</a></li>
          <li><a href="#">Fan-Art und Cosplay</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AnimeBanner from '@/components/AnimeBanner.vue'
import FantasyBanner from '@/components/FantasyBanner.vue'
import ScienceFictionBanner from '@/components/ScienceFictionBanner.vue'
import MysteryBanner from '@/components/MysteryBanner'
import HorroBanner from '@/components/HorrorBanner'
import RomanceBanner from '@/components/RomanceBanner'

export default {
  name: 'Genre',
  components: {
    AnimeBanner,
    FantasyBanner,
    ScienceFictionBanner,
    MysteryBanner,
    HorroBanner,
    RomanceBanner
  },
  data () {
    return {
      genres: {
        anime: {
          title: 'Anime',
          description: 'Willkommen im Anime-Forum! Hier kannst du alles rund um deine Lieblings-Animes diskutieren.',
          bannerComponent: 'AnimeBanner'
        },
        fantasy: {
          title: 'Fantasy',
          description: 'Willkommen im Fantasy-Forum! Entdecke die Welt der Magie und Abenteuer.',
          bannerComponent: 'FantasyBanner'
        },
        'science-fiction': {
          title: 'Science Fiction',
          description: 'Willkommen im Science Fiction-Forum! Erkunde die Zukunft und fremde Welten.',
          bannerComponent: 'ScienceFictionBanner'
        },
        mystery: {
          title: 'Mystery',
          description: 'Willkommen im Mystery-Forum! Tauche ein in Geheimnisse und ungelöste Rätsel!',
          bannerComponent: 'MysteryBanner'
        },
        horror: {
          title: 'Horror',
          description: 'Willkommen im Horror-Forum! Begib dich in düstere Welten voller Schrecken und Spannung!',
          bannerComponent: 'HorrorBanner'
        },
        romance: {
          title: 'Romance',
          description: 'Willkommen im Romance-Forum! Entdecke die Welt der Liebe und Leidenschaft!',
          bannerComponent: 'RomanceBanner'
        }
      }
    }
  },
  computed: {
    genreTitle () {
      return this.genres[this.$route.params.genre]?.title || 'Genre'
    },
    genreDescription () {
      return this.genres[this.$route.params.genre]?.description || ''
    },
    genreBannerComponent () {
      return this.genres[this.$route.params.genre]?.bannerComponent || 'AnimeBanner'
    }
  }
}
</script>

<style scoped>
.genre-page {
  background-size: cover;
  background-position: center;
  color: #000000;
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

.header h1 {
  font-size: 3rem;
  font-family: 'Fantasy', sans-serif;
  text-align: center;
  margin-bottom: 20px;
  color:#2c3e50;
  text-shadow: 2px 2px 4px #000;
}

.content {
  background: rgba(0, 0, 150, 0.1);
  padding: 20px;
  border-radius: 10px;
}

.content p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.forum-topics {
  margin-top: 20px;
}

.forum-topics h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.forum-topics ul {
  list-style: none;
  padding: 0;
}

.forum-topics ul li {
  margin: 10px 0;
}

.forum-topics ul li a {
  color: #2c3e50;
  text-decoration: none;
  font-size: 1.2rem;
}

.forum-topics ul li a:hover {
  text-decoration: underline;
}
</style>
