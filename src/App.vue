<template>
  <div id="app">

      <van-row type="flex" class="top_button">
        <!--<router-link to="/Login">返回</router-link>-->
        <!--<router-link to="/get_id">控制界面</router-link>-->
      </van-row>

    <router-view></router-view>

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
  margin-top: 30px;
  height: 100vh;
  background: url("./assets/bk.jpg");
  background-size: 100% 100%;
}
  .top_button{
      position: fixed;
      top: 0px;
      left: 0px;
     /*// height: 30px;*/
      /*width: 100%;*/
  }
</style>
