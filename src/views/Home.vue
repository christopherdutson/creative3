<script>
export default {
  name: 'Home',
  data() {
    return {
      enterName: '',
      starting: true,
      onBook: true,
      currentVerse: "",
      currentBook: "",
      currentChapter: "",
      total: 0,
      correct: 0,
      guesses: 3,
      message: "",
      showNext: false
    }
  },
  methods: {
    getVerse() {
        let rand = Math.floor(Math.random() * 6604);
        return this.$root.$data.verses[rand];
    },
    start() {
      this.starting = false;
      this.showNext = false;
      this.message = "";
      this.currentVerse = this.getVerse();
      var verse = this.currentVerse.reference;
      var lastWord = verse.lastIndexOf(" ");
      this.currentBook = verse.substring(0, lastWord);
      var colon = verse.lastIndexOf(":");
      this.currentChapter = verse.substring(lastWord + 1, colon);
      this.guesses = 3;
      this.onBook = true;
    },
    checkBook(book) {
      if(book === this.currentBook) {
        this.message = "Correct Book!";
        this.onBook = false;
      }
      else {
        --this.guesses;
        if(this.guesses === 0) {
          this.message = "You're Out!";
          this.next();
        }
        else {
          this.message = "Try Again!";
        }
      }
    },
    checkChapter(chapter) {
      var correctChapter = parseInt(this.currentChapter);
      if(chapter === correctChapter) {
        this.message = "Correct Chapter!";
        ++this.correct;
        this.next();
      }
      else {
        --this.guesses;
        if(this.guesses === 0) {
          this.message = "You're out";
          this.next();
        }
        else if (correctChapter > chapter) {
          this.message = "Higher than " + chapter;
        }
        else {
          this.message = "Lower than " + chapter;
        }
      }
    },
    next() {
      ++this.total;
      this.showNext = true;
      var history = this.enterName;
      if(this.guesses === 0) {
        history += " struck out on " + this.currentVerse.reference;
      }
      else {
        history += " guessed " + this.currentVerse.reference + " in " + (3 - this.guesses) + " guesses";
      }
      this.$root.$data.history.push(history);
    }
  }
}
</script>

<template>
<div>
  <div v-if="starting" class="wrapper">
    <div class="name">
      <h2>Enter your name:</h2>
      <form class="pure-form">
        <input v-model="enterName" />
      </form>
      <button type="submit" class="pure-button pure-button-primary" v-on:click="start">Enter</button>
    </div>
  </div>

  <div v-else>
    <div class="center">
      <h2>Player: {{enterName}}</h2>
      <h3>You have {{guesses}} guesses left</h3>
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

    <template v-if="showNext">
      <h3 class="center">Answer: {{currentVerse.reference}}</h3>
      <h3 class="center">Score: {{correct}}/{{total}}</h3>
      <div class="nextWrapper">
        <button type="submit" class="pure-button pure-button-primary next" v-on:click="start">Next</button>
      </div>
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
  margin: 0px;
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
