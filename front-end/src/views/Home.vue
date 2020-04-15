<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      enterName: '',
      isStarting: true,
      onBook: true,
      currentVerse: "",
      currentBook: "",
      currentChapter: "",
      totalRounds: 0,
      correctRounds: 0,
      guessesLeft: 3,
      currentRound: 9,
      message: "",
      showNext: false,
      isFinished: false,
    }
  },
  methods: {
    randomVerse() {
        let rand = Math.floor(Math.random() * 6604);
        return this.$root.$data.verses[rand];
    },
    startGame() {
      this.isStarting = false;
      this.isFinished = false;
      this.totalRounds = 0;
      this.correctRounds = 0;
      this.currentRound = 10;
      this.startRound();
    },
    startRound() {
      this.showNext = false;
      --this.currentRound;
      this.message = "";
      this.currentVerse = this.randomVerse();
      var verse = this.currentVerse.reference;
      var lastWord = verse.lastIndexOf(" ");
      this.currentBook = verse.substring(0, lastWord);
      var colon = verse.lastIndexOf(":");
      this.currentChapter = verse.substring(lastWord + 1, colon);
      this.guessesLeft = 3;
      this.onBook = true;
    },
    checkBook(book) {
      if(book === this.currentBook) {
        this.message = "Correct: " + book;
        this.onBook = false;
      }
      else {
        --this.guessesLeft;
        if(this.guessesLeft === 0) {
          this.message = "You're Out!";
          this.finishRound();
        }
        else {
          this.message = "Not " + book;
        }
      }
    },
    checkChapter(chapter) {
      var correctChapter = parseInt(this.currentChapter);
      if(chapter === correctChapter) {
        this.message = "Correct!";
        ++this.correctRounds;
        this.finishRound();
      }
      else {
        --this.guessesLeft;
        if(this.guessesLeft === 0) {
          this.message = "You're out!";
          this.finishRound();
        }
        else if (correctChapter > chapter) {
          this.message = "Higher than " + chapter;
        }
        else {
          this.message = "Lower than " + chapter;
        }
      }
    },
    async saveScore() {
      try {
        let r1 = await axios.post('/api/scores', {
          username: this.enterName,
          score: this.correctRounds,
        });
        this.addScore = r1.data;
      } catch (error) {
        console.log(error);
      }
    },
    finishRound() {
      ++this.totalRounds;
      this.showNext = true;
      if(this.totalRounds == 9) {
        this.isFinished = true;
        this.saveScore();
      }
    },
    done() {
      this.isStarting = true;
    }
  }
}
</script>

<template>
<div>
  <div v-if="isStarting" class="wrapper">
    <div class="name">
      <h2>Enter your name:</h2>
      <form class="pure-form">
        <input v-model="enterName" />
      </form>
      <button type="submit" class="pure-button pure-button-primary" v-on:click="startGame">Enter</button>
    </div>
  </div>

  <div v-else>
    <div class="center">
      <h2>Player: {{enterName}}</h2>
      <h3>Round {{currentRound}}: You have {{guessesLeft}} strikes left</h3>
      <h3>{{message}}</h3>
    </div>

    <template v-if="!showNext">
      <div class='content'>
        <div class='box'>
            <div class='scripture'>
              {{currentVerse.text}}
            </div>
        </div>
        <div class='box'>
          <template v-if="onBook">
            <div class='book' v-for="book in this.$root.$data.books" :key="book.book" v-on:click="checkBook(book.book)">{{book.book}}</div>
          </template>
          <template v-else>
            <div class='book' v-for="chapter in 63" :key="chapter" v-on:click="checkChapter(chapter)">{{chapter}}</div>
          </template>
        </div>
      </div>
    </template>

    <template v-else>
      <h3 class="center">Answer: {{currentVerse.reference}}</h3>
      <h3 class="center">Score: {{correctRounds}}/{{totalRounds}}</h3>
      <template v-if="!isFinished">
        <div class="nextWrapper">
          <button type="submit" class="pure-button pure-button-primary next" v-on:click="startRound">Next</button>
        </div>
      </template>
      <template v-else>
        <div class="nextWrapper">
          <button type="submit" class="pure-button pure-button-primary next" v-on:click="startGame">New Game</button>
          <button type="submit" class="pure-button pure-button-primary next" v-on:click="done">Done</button>
        </div>
      </template>
    </template>
  </div>
</div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.name {
  width: 40%;
}

button {
  margin-top: 20px;
}

.next {
  margin-right: 10px;
}

.nextWrapper {
  display: flex;
  justify-content: center;
}

form {
  display: table;
  width: 100%;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}

.center {
  text-align: center;
}
.content {
  display: flex;
}
.box {
  flex: 40px;
  text-align: center;
  margin: 30px 60px;
  border: black solid 2px;
  background-color: white;
  overflow-y: auto;
  max-height: 300px;
}
.book {
  border-bottom: black solid 1px;
  padding: 10px;
}
.scripture {
  padding: 30px;
}

@media (max-width: 495px) {
.content {
  display: block;
}
.box {
  margin: 20px 0px;
}
}
</style>
