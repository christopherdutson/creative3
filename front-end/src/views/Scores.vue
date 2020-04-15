<template>
  <div class="scores">
    <div class="header">
      <h2>Scores:</h2>
    </div>
    <div class="item" v-for="score in scores" :key="score.id">
      <p>{{score.username}}</p><p class="score">{{score.score}}</p>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 1.5em;
}

.header {
  font-size: 1.5em;
  text-align: center;
  padding: 1px 15px;
  color: #c4d365;
  background: #304a50;
  margin: 2px;
}

.scores {
  margin: auto;
  width: 50%;
}

.score {
  text-align: right;
}

.item {
  display: grid;
  grid-template-columns: 3fr 1fr;
  background: #304a50;
  margin: 2px;
  padding: 1px 15px;
  color: #c4d365;
}

@media (max-width: 495px) {
.scores {
  width: 100%;
}
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      scores: [],
    }
  },
  created() {
    this.getScores();
  },
  methods: {
    async getScores() {
      try {
        let response = await axios.get("/api/scores");
        this.scores = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }

}
</script>