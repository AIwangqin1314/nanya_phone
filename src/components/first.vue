<template>
    <div id="f" class="fisst">

        <!--<div class="buto">-->

        <van-button  round type="primary" size="normal" @click="get_id" >开始测试</van-button>

        <!--</div>-->
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
    .van-button {
        position:fixed;
        bottom:10%;
        left: 40%;
    }
.buto{
    /*position:fixed; bottom:10%;*/
    /*left: 10%;*/

 }

</style>
