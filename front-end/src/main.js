import Vue from 'vue'
import App from './App.vue'
import router from './router'
import all_books from './book_of_mormon.js'

Vue.config.productionTip = false

let data = {
  books: all_books,
  chapters: [],
  verses: [],
  score: 0
}

new Vue({
  router,
  data,
  methods: {
    setChapters: function() {
      for(let i = 0; i < this.books.length; ++i) {
        this.chapters = this.chapters.concat(this.books[i].chapters);
      }
    },
    setVerses: function() {
      for(let i = 0; i < this.chapters.length; ++i) {
          this.verses = this.verses.concat(this.chapters[i].verses);
      }
    }
  },
  beforeMount() {
    this.setChapters(),
    this.setVerses()
  },
  render: h => h(App)
}).$mount('#app')
