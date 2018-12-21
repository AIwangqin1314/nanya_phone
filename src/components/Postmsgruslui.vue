<template>
    <div>
        <h1>提交结果</h1>
        <img alt="运势图" src=""  v-lazy="imageList"  class="img_post">

    </div>
</template>
<script>
    import global_ from './Dt/Global'
    export default {
        data() {
            return {
                picid:"",
                name:"",
                pic_num:15,
                imageList: 'http://129.204.65.155/pic/ny'+global_.token+'.jpg'};
        },
        // mounted:function(){
        //     this.name=this.$route.params.name;
        //     global_.token=this.$route.params.picid;
        //     console.log(this.$route.params.picid);
        //
        // }
    }
</script>

<style>
    .img_post{
        width: 80%;
        height: 80%;
    }
</style>
