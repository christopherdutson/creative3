<template>
<div id="app">
  <div id="menu">
    <div id="home">
      <router-link to="/">
        <h1>Book of Mormon Baseball</h1>
      </router-link>
    </div>
    <div id="side">
      <router-link to="/about">
        <div class="menu-item about">
          <p>About</p>
        </div>
      </router-link>
      <router-link to="/scores">
        <div class="menu-item">
          <p>Scores</p>
        </div>
      </router-link>
    </div>
  </div>
  <router-view />
  <footer>
    <a href="https://github.com/christopherdutson/creative3.git">Visit my GitHub Here</a>
  </footer>
</div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin-bottom: 80px;
  background-color: #c0caa3;
}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none home side";
  margin-bottom: 50px;
  background-color: #304a50;
}

#menu a {
  padding: 30px;
  color: #c4d365;
}

#home {
  grid-area: home;
  display: flex;
  text-align: center;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
}

.about {
  margin-right: 50px;
}

a {
    color: #c4d365;
    text-decoration: none;
}
a:hover {
    color: white;
}
footer {
  display: block;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 15px 30px;
  background-color: #304a50;
  margin-top: 100px;
}
</style>
