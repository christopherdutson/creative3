<template>
  <div class="scores">
    <div v-if="!this.$root.$data.history.length">
      <h1>You have not played any games</h1>
      <p>Nothing to show here</p>
    </div>

    <div v-else>
      <div class="items">
        <div class="item" v-for="(score, index) in this.$root.$data.history" :key="index">
          <h2>{{score}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 1.5em;
}

.scores {
  margin: 60px;
}

.item {
  display: flex;
  background: #304a50;
  margin: 15px;
  padding: 0px 15px;
  color: #c4d365;
}

.items {
  justify-content: space-around;
}
</style>