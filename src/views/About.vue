<template>
  <div class="container about">
    <h1 class="display-4">About Fiction Forum</h1>
    <p class="lead">Welcome to Fiction Forum, a place for all enthusiasts of stories and fantasies.</p>

    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Our Vision</h5>
        <p class="card-text">Fiction Forum was created to unite a community of storytellers and readers who share a passion for various genres.</p>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">The Founders</h5>
        <p class="card-text">Fiction Forum was founded by Ali Alagöz and Amin Tekaya. Ali is an avid fan of science fiction, while Amin has a particular interest in romance, showcasing a passion for engaging love stories.</p>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Our Genres</h5>
        <p class="card-text">Explore a variety of genres at Fiction Forum including science fiction, fantasy, horror, romance, mystery, and more.</p>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">Number Guessing Game</h5>
        <p class="card-text">Try to guess the number between 1 and 100!</p>
        <input type="number" v-model="userGuess" @keyup.enter="checkGuess" class="form-control" placeholder="Enter your guess" />
        <button @click="checkGuess" class="btn btn-primary mt-2">Guess</button>
        <p v-if="message" class="mt-2">{{ message }}</p>
        <button @click="resetGame" class="btn btn-secondary mt-2">Reset Game</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      targetNumber: null,
      userGuess: null,
      message: ''
    }
  },
  mounted () {
    this.resetGame()
  },
  methods: {
    checkGuess () {
      const guess = parseInt(this.userGuess)
      if (isNaN(guess)) {
        this.message = 'Please enter a valid number.'
      } else if (guess < this.targetNumber) {
        this.message = 'Too low! Try again.'
      } else if (guess > this.targetNumber) {
        this.message = 'Too high! Try again.'
      } else {
        this.message = 'Congratulations! You guessed the number!'
      }
      this.userGuess = null
    },
    resetGame () {
      this.targetNumber = Math.floor(Math.random() * 100) + 1
      this.userGuess = null
      this.message = ''
    }
  }
}
</script>

<style scoped>
.about {
  margin-top: 20px;
}

.card {
  margin-bottom: 20px;
}

input.form-control {
  margin-top: 10px;
}

button {
  margin-top: 10px;
}
</style>
