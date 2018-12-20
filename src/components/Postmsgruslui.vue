<template>
    <div>
        <h1>提交结果</h1>
        <h4>生日快乐</h4>
        <!--<img src=""  v-lazy="imageList" >-->
        <img alt="运势图" >
    </div>
</template>
<script>
    export default {
        data() {
            return {
                picid:"",
                name:"",
                imageList: 'http://st2.depositphotos.com/thumbs/2627021/image/9638/96385166/api_thumb_450.jpg!thumb'};
        },
        mounted:function(){
            this.name=this.$route.params.name;
            this.picid=this.$route.params.picid;
        }
    }
</script>

<style>
</style>
