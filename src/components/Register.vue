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
            <van-field
                    v-model="BirthDay"
                    label="生日"
                    is-link arrow-direction="down"
                    @click="change_picker_show"
                    readonly="true"
                    required
            />

        </van-cell-group>

        <br>
        <van-button round type="danger" @click="up_register">注册</van-button>

            <van-popup v-model="year" position="bottom" :overlay="false">
                <van-datetime-picker
                        v-model="currentDate"
                        type="date"
                        :min-date="minDate"
                        
                        @cancel="ondateCancel"
                        @confirm="ondateConfirm"
                />
            </van-popup>


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
                year:false,
                phone:"",
                sex:"",
                currentDate: new Date(2019, 0, 1),
                username:"",
                show:false,
                BirthDay:"",
                strCardNo:"",
                columns: ['男', '女'],
                minDate: new Date(1950, 0, 1),
            }
        },
        methods:{
            onConfirm(picker, value, index){
               // this.$toast(`当前值：${value}, 当前索引：${index}`);
                this.show=false;
                if (value===0)this.sex="男";
                else this.sex="女";
            },onCancel(){
                this.show=false;
                this.$toast.success("取消选择");
            },
            ondateCancel(){
                this.year=false;
                this.$toast.success("取消选择");
            },
            ondateConfirm( value){
                // this.$toast(`当前值：${value}, 当前索引：${index}`);
                this.year=false;
                this.BirthDay=value;
                //this.$toast.success("取消选择");
            },

            change_picker_show(){
                this.year=true;
                console.log("点击");
            },
            select_sex(){
                this.show=true;
            },
            formatter(type, value) {
                if (type === 'year') {
                    return value + this.$t('year');
                }
                if (type === 'month') {
                    return value + this.$t('month');
                }
                if (type === 'date') {
                    return value + this.$t('date');
                }
                return value;
            },
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
                        this.$ajax.post("/api", da1,
                            {
                                crossDomain: true,headers: {
                                    "Content-Type": "text/plain",
                                }
                            }
                        )
                            .then( response=>{
                                this.id++;
                                this.strCardNo=response.data.result.data.strCardNo;
                                //this.$toast(params.request.response);
                                console.log(this.strCardNo);
                                //成功后要注册后台服务
                                if (response.data.result.data.HasException===false) {
                                    this.$ajax.get('http://129.204.65.155/Nayajavaee/Houtai', {
                                        params: {
                                            strName: this.username,
                                            phone: this.phone,
                                            strSex: this.sex,
                                            strCardNo: this.strCardNo,
                                            BirthDay: this.BirthDay
                                        }
                                    })
                                        .then(resp => {
                                            console.log(resp.data);
                                            if (resp.data.status === "ok") {
                                                this.$router.push({path: '/Postmsg'});
                                            } else {
                                                this.$toast("注册失败，请重试");
                                            }
                                        }).catch(err => {             //
                                        console.log('请求失败：' + err.status + ',' + err.statusText);
                                    });
                                }else
                                {
                                    this.$toast(response.data.result.data.Exception);
                                }
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


