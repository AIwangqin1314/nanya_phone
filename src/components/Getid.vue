<template>
    <div>
        <img src="http://nxha.ynnsd.com/Areas/Pages/Content/images/img_logo.png" class="img_login" />
        <br>
        请输入手机登录后给的ID号码：
        <br>
        <van-cell-group>
            <van-field v-model="ID_value" placeholder="请输入ID号" />
        </van-cell-group>
        <van-button round type="danger" @click="get_id" >启动</van-button>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                ID_value: "",
                show: false,
                resp_id:0,
                flg:"ok"
            }
        },
        methods: {
            register_click() {
                this.$router.push({path: '/Register'})
            },
            get_id() {
                if (this.ID_value === "") {
                    this.$toast("不能空");
                } else {
                    const toast = this.$toast.loading({
                        duration: 0,
                        forbidClick: true,
                        loadingType: 'spinner',
                        message: "正在验证"
                    });
                    // this.$ajax.get('http://locahost:8080/Nayajavaee/Chaxun',{
                    //     params:{
                    //         // name:this.name_uer,
                    //         phone:this.phone,
                    //         gift:this.cell_value
                    //     }
                    // })
                    //     .then(resp => {
                    //         console.log(resp.data);
                    //         if(resp.data.gift===""){
                    //             this.$router.push({
                    //                 name: 'post_msg',
                    //                 params: {
                    //                     name: this.username,
                    //                     phone: this.phone
                    //                 }
                    //             })
                    //         }else {
                    //             toast.message="验证成功，正在启动设备请稍等"
                    //         }
                    //     }).catch(err => {             //
                    //     toast.message="请求失败";
                    //     this.$toast.clear();
                    // })
                    if (this.resp_id === 0) {//验证成功。提示用户，启动现场
                        //转圈等待，提示启动
                        this.$ajax.get('http://129.204.65.155/Servicehoutai/Client', {
                            params: {
                                name: this.name_uer,
                                id: this.ID_value,
                                flg: this.flg
                            }
                        })
                            .then(resp => {
                                console.log(resp.data);

                                if (resp.data.stuat === 1) {
                                    toast.message = "已经启动" + resp.data.input;
                                    this.$toast.clear();
                                } else {
                                    toast.message = "请重试";
                                    this.$toast.clear();
                                }
                            }).catch(err => {             //
                            console.log('请求失败：' + err.status + ',' + err.statusText);
                            toast.message = "请求失败";
                            this.$toast.clear();
                        })
                    }
                }
            }
        }
    }
</script>

