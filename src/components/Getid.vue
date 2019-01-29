<template>
    <div id="f" class="fisst">
        <van-button id="ok" round type="primary" size="normal" @click="get_id" >开始测试</van-button>
    </div>
</template>

<script>
    export default {
        name: "",
        methods: {
            get_id(){
                this.$router.push({path:'/Postmsg'})
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
    #ok{
        position:fixed;
        bottom:10%;
        left: 40%;
    }

</style>
