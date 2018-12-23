<template>
    <div id="f" class="fisst">
        <br>
        <br><br>
        <br>
        <br>
        <br>
        <br>
        <div class="buto">

        <van-button round type="primary" size="large" @click="get_id" >开始测试</van-button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        methods: {
            get_id(){
                this.$router.push({path:'/Login'})
            }
        }
    }
</script>

<style  lang="less">
    @import '../style/var.less';
    #f{
        background: url("../assets/fs.png");
        background-size: 100% 100%;
        height: 100vh;
    }
.buto{
    position:fixed; bottom:10%;
    left: 40%;

 }

</style>
