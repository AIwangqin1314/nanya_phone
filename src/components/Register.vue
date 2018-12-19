<template>
    <div>
        <img src="http://nxha.ynnsd.com/Areas/Pages/Content/images/img_logo.png" class="img_login" />
        <br>
        <h3>注册</h3>
        <van-cell-group id="cell_all">
            <van-field
                    v-model="username"
                    required
                    clearable
                    label="用户名"
                    placeholder="请输入用户名"
            />

            <van-field
                v-model="sex"
                label="性别"
                placeholder="点击选择"
                @click="select_sex"
                required
                readonly="true"
        />
            <van-field
                    v-model="phone"
                    label="电话"
                    placeholder="请输入电话"
                    required
            />
        </van-cell-group>
        <br>
        <van-button round type="danger" @click="up_register">注册</van-button>

        <!--<van-popup v-model="show">性别选择-->
            <!--<van-radio-group >-->
                <!--<van-radio name="1" @click="select_man">男</van-radio>-->
                <!--<van-radio name="2" @click="select_woman">女</van-radio>-->
            <!--</van-radio-group>-->
        <!--</van-popup>-->

        <van-popup v-model="show" position="bottom" :overlay="false">
            <van-picker
                    show-toolbar
                    title="性别选择"
                    :columns="columns"
                    @cancel="onCancel"
                    @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                id:0,
                phone:"",
                sex:"",
                username:"",
                show:false,
                BirthDay:"",
                columns: ['男', '女'],
            }
        },
        methods:{
            onConfirm(picker, value, index){
               // this.$toast(`当前值：${value}, 当前索引：${index}`);
                this.show=false;
                if (value===0)this.sex="男";
                else this.sex="女";
            },
            onCancel(){
                this.show=false;
                this.$toast.success("取消选择");
            },
            select_sex(){
                this.show=true;
            },
            // select_man(){
            //     this.sex="男";
            // },
            // select_woman(){
            //     this.sex="女";
            // },
            up_register(){
                if (this.username === "") {
                    this.$toast("姓名不能空");
                } else if (this.sex === ''){
                    this.$toast("性别未选择");
                } else if (this.phone === '') {
                    this.$toast("电话不能空");
                }  else {
                    if (!/^1[3456789]\d{9}$/.test(this.phone)) {
                        this.$toast("手机号格式不对");
                    } else if (/[0-9]/.test(this.username)) {
                        this.$toast("姓名不能包含数字");
                    } else {
                        var da1 =  JSON.stringify({
                            id:this.id,
                            method:"nymc_member_register",
                            params: {
                                key: "0C46AF1DB72A28AE",
                                strName: this.username,
                                strSex: this.sex,
                                strMobile: this.phone,
                                dtBirthDay: this.BirthDay
                            }
                        });
                        //this.$toast(this.username+this.sex+this.phone);
                        this.$ajax.post("/api", da1,
                            {  // "Access-Token": "84c6635800b14e0eba4f7ece65e095a1",
                                crossDomain: true,headers: {
                                    "Content-Type": "text/plain",
                                }
                            }
                        )
                            .then( response=>{
                                this.id++;
                                console.log(response);
                                console.log(response.request.response);
                                this.$toast(response.request.response);
                                //成功后要注册后台服务
                                this.$ajax.get('http://129.204.65.155/Nayajavaee/Houtai',{
                                    params:{
                                        strName:"",
                                        phone:"",
                                        strSex:"",
                                        strCardNo:"",
                                        BirthDay:""
                                    }
                                })
                                    .then(resp => {
                                        console.log(resp.data);
                                        if(resp.data.status==="ok"){
                                            this.$router.push({ path:'/Postmsg'});
                                        }else {
                                            this.$toast("注册失败，请重试");
                                        }
                                    }).catch(err => {             //
                                    console.log('请求失败：'+err.status+','+err.statusText);
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
