<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <router-link to="/HelloWorld">1</router-link>
    <router-link to="/Postmsg">2</router-link>
    <router-view></router-view>
    <br>
    <!--<Postmsg ></Postmsg>-->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Postmsg from './components/Postmsg'

export default {
  name: 'app',
  // components: {
  //   HelloWorld,
  //     Postmsg
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
