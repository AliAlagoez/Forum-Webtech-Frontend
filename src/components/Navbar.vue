<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../assets/img.png" alt="FF Logo" width="50" height="auto" class="d-inline-block align-text-top">
        Fiction Forum
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/">Home </router-link>
          <router-link class="nav-link" to="/about">About</router-link>
          <router-link class="nav-link" to="/post">Posts</router-link>
          <!-- Neuer Punkt 'Comment' -->
          <!-- Dropdown-Menü 'Genre' -->
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Genre
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" to="/genre/anime">Anime</router-link></li>
              <li><router-link class="dropdown-item" to="/genre/science-fiction">Science Fiction</router-link></li>
              <li><router-link class="dropdown-item" to="/genre/fantasy">Fantasy</router-link></li>
              <li><router-link class="dropdown-item" to="/genre/romance">Romance</router-link></li>
              <li><router-link class="dropdown-item" to="/genre/mystery">Mystery</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar-brand {
  font-size: xx-large;
  font-family: MathJax_Script, 'Times New Roman', Times, STIXGeneral, serif;
}

.nav-link {
  font-size: large;
  font-family: MathJax_Script, 'Times New Roman', Times, STIXGeneral, serif;
}
</style>
