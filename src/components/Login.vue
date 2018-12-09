<template>
<div>
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
                username: "",
                value: "",
                phone: "",
                cell_value: "",
                columns: ['手机', 'iPad', '苹果', '电视', '洗衣机'],
                show: false,

            }
        },
        methods: {
            register_click() {
                this.$router.push({path: '/Register'})
            },
            post_msg_click() {
                if (this.username === "") {
                    this.$toast("姓名不能空");
                } else if (this.phone === '') {
                    this.$toast("电话不能空");
                } else {
                    if (!/^1[3456789]\d{9}$/.test(this.phone)) {
                        this.$toast("手机号格式不对");
                    } else if (/[0-9]/.test(this.username)) {
                        this.$toast("姓名不能包含数字");
                    } else {

                        this.$ajax.get('http://129.204.65.155:8080/Nayajavaee/Chaxun',{
                            params:{
                                // name:this.name_uer,
                                phone:this.phone,
                                gift:this.cell_value
                            }
                        })
                            .then(resp => {
                                console.log(resp.data);
                                // if(resp.data.count_num)this.$router.push({ path:'/Postmsgruslui'});
                                // else
                                //alert(resp.data.count_num);
                                if(resp.data.gift===""){
                                    this.$router.push({
                                        name: 'post_msg',
                                        params: {
                                            name: this.username,
                                            phone: this.phone
                                        }
                                    })
                                }else {
                                    this.$toast(`您已经选择礼物，选择的礼物是：`+resp.data.gift);
                                }
                            }).catch(err => {             //
                            console.log('请求失败：'+err.status+','+err.statusText);
                        });
                        // this.$router.push({
                        //     name: 'post_msg',
                        //     params: {
                        //         name: this.username,
                        //         phone: this.phone
                        //     }
                        // })
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


