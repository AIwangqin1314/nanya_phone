<template>
  <div id="app" >
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
    date(){
        bodyHeight:""
    },
    mounted:function(){

        var screenHeight;
        if (window.innerHeight){
            screenHeight = window.innerHeight;
        } else if ((document.body) && (document.body.clientHeight)){
            screenHeight = document.body.clientHeight;
        }
        $("html,body").height(screenHeight);
    }
    //     var viewHeight = window.innerHeight;
    //     $(document).ready(function () {
    //         var viewHeight = window.innerHeight;
    //         $().height(viewHeight)
    //         $().height(viewHeight * x%)
    //         $().height(viewHeight * y%)
    //     })


    }
</script>
<style>
#app {
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
