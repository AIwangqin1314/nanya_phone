<template>
    <div>
        <h4>运势图</h4>
        <!--<img alt="运势图" src=""  v-lazy="imageList"  class="img_post">-->
        <img alt="运势图" src="http://129.204.65.155/pic/ny.jpg"   class="img_post">
    </div>
</template>
<script>
    import global_ from './Dt/Global'
    export default {
        data() {
            return {
                picid:"",
                name:"",
                urk:"",
                pic_num:15,
                imageList: 'http://129.204.65.155/pic/ny'+global_.token+'.jpg'};
        },
        // created(){
        //
        //     this.urk = require('http://129.204.65.155/pic/ny'+global_.token+'.jpg');
        //
        // }
        // mounted:function(){
        //     // this.name=this.$route.params.name;
        //     // global_.token=this.$route.params.picid;
        //     // console.log(this.$route.params.picid);
        //
        // }
    }
</script>

<style>
    .img_post{
        width: 100%;
        height: 90%;
    }
</style>
