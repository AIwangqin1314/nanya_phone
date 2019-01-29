<template>
    <div class="post">
        <!--<img alt="运势图" src=""  v-lazy="imageList"  class="img_post">-->
        <img :src="weatherArr" alt="运势图"  class="img_post">
        <van-popup v-model="show":overlay="true" overlay-class="overlay_post">
        </van-popup>
    </div>
</template>
<script>
    import global_ from './Dt/Global'
    export default {
        data() {
            return {
                show:false,
                weatherArr : "",
                picid:"",
                name:"",
                urk:"",
                pic_num:15,
                imageList: 'http://129.204.65.155/pic/ny'+global_.token+'.jpg'};
        },
        mounted:function(){

            this.weatherArr="http://129.204.65.155/pic/ny"+this.$route.params.picid+".jpg";
            console.log(this.weatherArr);

        }
    }
</script>

<style>
    .img_post{
        width: 100%;
        height: 90%;
    }
    .post{
        background: #f8f8f8;
    }
    .overlay_post{
        background: url("../assets/share.png")no-repeat center ;
        background-size: contain;
    }
</style>
