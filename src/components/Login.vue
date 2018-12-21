<template>
<div >
    <img src="http://nxha.ynnsd.com/Areas/Pages/Content/images/img_logo.png" class="img_login" />
    <h4>登录</h4>
    <van-cell-group id="cell_all">
        <van-field
                v-model="username"
                required
                clearable
                label="用户名"
                icon="question"
                placeholder="请输入用户名"
                @click-icon="$toast('有疑问请拔打9553067')"
        />

        <van-field
                v-model="phone"
                type="tel"
                label="电话号码"
                placeholder="请输入电话号码"
                required
        />
    </van-cell-group>
    <br>
    <!--<van-button round type="danger">登录</van-button>-->
    <div>

        <van-row type="flex" justify="space-around">
            <van-button round type="danger" @click="post_msg_click" >登录</van-button>
            <van-button round type="danger" @click="register_click">注册</van-button>
        </van-row>
        <!--<van-button round type="danger" class="right_button">登录</van-button>-->
        <!--<router-link to="/Register" class="left_button">注册</router-link>-->
        <!--<router-link to="/Register" class="left_button">注册</router-link>-->
    </div>

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
                     this.$toast("用户名不能空");
                }else if (this.phone === '') {
                    this.$toast("电话不能空");
                } else {
                    if (!/^1[3456789]\d{9}$/.test(this.phone)) {
                        this.$toast("手机号格式不对");
                    }  else {
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
                                            this.$router.push({
                                            name: 'post_msg',
                                            params: {
                                                name: this.username,
                                                phone: this.phone,
                                                BirthDay:this.BirthDay,
                                                strCardNo:this.strCardNo
                                            }
                                        })
                                }else{
                                        if(response.data.result.status==="ok") {
                                            // this.$toast("该用户未注册，请到注册界面注册!");
                                            this.$toast(respny.data.result.data.Exception+",请到注册界面注册!");
                                        }else
                                        {
                                            this.$toast("登录失败,请重试");
                                        }
                                   // this.$toast("该用户未注册，请到注册界面注册!");

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
    }

</style>


