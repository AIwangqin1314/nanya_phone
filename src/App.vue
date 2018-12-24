<template>
  <div id="app" class="vuer">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',

    mounted:function(){
        // 获取浏览器的高度
        let h = document.body.clientHeight || document.documentElement.clientHeight // 解决背景图变形
        document.getElementsByClassName('vuer')[0].style.height = h + 'px'

  }
}

</script>
<style>
#app { }
  .vuer {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    background: url("./assets/bk.png");
    background-size: 100% 100%;
  }

</style>
