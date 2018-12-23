<template>
<div>
    <img src="http://129.204.65.155/img/log.png" class="img_login" />

        <h4>登录</h4>
    <div  class="cellss">
    <van-row type="flex" justify="space-around" >
        <van-col span="18" >
            <van-field
                    v-model="username"
                    required
                    clearable
                    label="诺享会账号"
                    placeholder="请输入账号"
                    border="true"
            />
        </van-col>
    </van-row>
    <br>
    <van-row type="flex" justify="space-around">
        <van-col span="18" >
                <van-field
                        v-model="phone"
                        type="tel"
                        label="电话号码"
                        placeholder="请输入电话号码"
                        required
                />
        </van-col>
    </van-row>
</div>
    <br>
        <van-row type="flex" justify="space-around">
            <van-button round type="danger" @click="post_msg_click" >登录</van-button>
            <van-button round type="danger" @click="register_click">注册</van-button>
        </van-row>
</div>
</template>

<script>
    export default {
        data() {
            return {
                id:0,
                username: "",
                value: "",
                phone: "",
                cell_value: "",
                BirthDay:"",
                strSex:"",
                columns: ['手机', 'iPad', '苹果', '电视', '洗衣机'],
                show: false,

            }
        },
        methods: {
            register_click() {
                this.$router.push({path: '/Register'})
            },
            post_msg_click() {
                if (this.username === '') {
                     this.$toast("诺享会账号不能空");
                }else if (this.phone === '') {
                    this.$toast("电话不能空");
                } else {
                    if (!/^1[3456789]\d{9}$/.test(this.phone)) {
                        this.$toast("手机号格式不对");
                    }  else {
                        const toastr = this.$toast.loading({
                            duration: 0,
                            forbidClick: true,
                            loadingType: 'spinner',
                            message: "正在登录"
                        });
                        var da2 =  JSON.stringify({
                            id:this.id,
                            method:"nymc_member_info",
                            params: {
                                key: "0C46AF1DB72A28AE",
                                userName: this.phone,
                            }
                        });
                        this.$ajax.post("/api", da2,
                            {
                                crossDomain: true,
                                headers: {
                                    "Content-Type": "text/plain",
                            }
                        }
                    )
                            .then( respny=>{
                                    this.id++;
                                    this.BirthDay=respny.data.result.data.dtBirthDay;
                                    this.strCardNo=respny.data.result.data.strCards;
                                    console.log(this.BirthDay+this.strCardNo+this.id);
                                    if (respny.data.result.data.HasException===false) {
                                        console.log("自己服务器请求");
                                        this.$toast.clear();
                                            this.$router.push({
                                            name: 'post_msg',
                                            params: {
                                                name: this.username,
                                                phone: this.phone,
                                                BirthDay:this.BirthDay,
                                                strCardNo:this.strCardNo,
                                                strSex: "登录"
                                            }
                                        })
                                }else{

                                   // this.$toast("该用户未注册，请到注册界面注册!");
                                        //this.$toast.setDefaultOptions(duration,1000);
                                        //toastr.duration=500;
                                       // toastr.message="respny.data.result.data.Exception"+",请到注册界面注册!";
                                        this.$toast(respny.data.result.data.Exception+",请到注册界面注册!");
                                }
                            })
                            .catch(function (error) {
                                console.log(error);

                                this.$toast("网络错误请重试!");
                            });
                    }
                }
            }
        }
    }
</script>
<style>
    .img_login{
        width: 40%;
        height: 40%;
        margin-top: 40px;
    }
    .cellss{

        text-align: left;
        opacity:0.8;
    }


</style>


