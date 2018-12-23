<template>
    <div>
        <img src="http://nxha.ynnsd.com/Areas/Pages/Content/images/img_logo.png" class="img_login" />
        <br>
        <h3>设备信息验证</h3>
        <van-row type="flex" justify="space-around" >
            <van-col span="18" >
            <van-field v-model="ID_value" placeholder="请输入登录时的电话号码" />
            </van-col>
        </van-row>
        <br>
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
                flg:"ok",
                picid:"",
                num:""
            }
        },
        methods: {
            register_click() {
                this.$router.push({path: '/Register'})
            },
            get_id() {
                if (this.ID_value === "") {
                    this.$toast("不能空");
                } else  if (!/^1[3456789]\d{9}$/.test(this.ID_value)) {
                    this.$toast("手机号格式不对");
                }else {
                    const toast = this.$toast.loading({
                        duration: 0,
                        forbidClick: true,
                        loadingType: 'spinner',
                        message: "正在验证"
                    });
                    this.resp_id = 1;
                    this.$ajax.get('/app/Nayajavaee/Houtai', {
                        params: {
                            phone: this.ID_value,
                            head: "one"
                        }
                    })
                        .then(resp => {
                            console.log(resp.data);
                            if (resp.data.status === "ok") {
                                this.num = resp.data.num;
                                this.picid = resp.data.picid;
                                this.resp_id = 2;
                                //this.$toast.clear();
                                toast.message = "正在启动";
                                if (this.resp_id === 2) {//验证成功。提示用户，启动现场
                                    //转圈等待，提示启动
                                    this.$ajax.get('/app/Servicehoutai/Client', {
                                        params: {
                                            name: "1",
                                            id: this.num,
                                            flg: this.flg
                                        }
                                    })
                                        .then(resp => {
                                            console.log(resp.data);
                                            if (resp.data.stuat === 1) {
                                                if(resp.data.jieguo==="有人用"){
                                                    toast.message = "有人使用，请稍后重试！";
                                                }else if (resp.data.jieguo==="无人站") {
                                                    toast.message = "请站在台上，请稍后重试！";
                                                }else if (resp.data.jieguo==="结果") {

                                                }else{
                                                    toast.message = "设备断线，请稍后重试！";
                                                }
                                                this.$toast.clear();
                                            } else {
                                                toast.message = resp.data.jieguo;
                                                this.$toast.clear();
                                            }
                                        }).catch(err => {             //
                                        console.log('请求失败：' + err.status + ',' + err.statusText);
                                        toast.message = "请求失败";
                                        this.$toast.clear();
                                    })
                                } else {
                                    toast.message = "启动号码错误请重试！";
                                    this.$toast.clear();
                                }
                            }else if (resp.data.status === "theer") {
                                this.resp_id = 0;
                                //this.$toast.clear();
                                const toastr = this.$toast.fail({
                                    duration: 1000,
                                    forbidClick: true,
                                    loadingType: 'spinner',
                                    message: "30分钟内一账号操作一次，请稍后重试！"
                                });
                            } else {
                                this.resp_id = 0;
                                //this.$toast.clear();
                                this.$toast("此号码未登录,请扫码登录后重试！");

                            }
                        }).catch(err => {             //
                        this.resp_id = 0;
                        toast.message = "请求失败";
                        this.$toast.clear();
                    })



                    }

            }
        }
    }
</script>

