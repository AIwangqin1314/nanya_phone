<template>
    <div class="fisst">
        <van-button round type="danger" @click="get_id" >启动</van-button>
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

<style scoped>
.fisst{
    height: 100vh;
    background: url("../assets/fs.png");
    background-size: 100% 100%;
    margin-bottom: 40px;
}
</style>
