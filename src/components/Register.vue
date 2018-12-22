<template>
    <div>
        <img src="http://nxha.ynnsd.com/Areas/Pages/Content/images/img_logo.png" class="img_login" />
        <br>
        <h3>欢迎新会员注册</h3>
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

            <van-popup v-model="dateTimeshow" position="bottom" :overlay="false">
                <van-datetime-picker
                        v-model="currentDate"
                        type="date"
                        :min-date="minDate"
                        :formatter="formatter"
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
    import { formatDate } from './Dt/Dt';
    export default {
        data(){
            return{
                id:0,
                dateTimeshow:false,
                phone:"",
                sex:"",
                currentDate: new Date(1990, 0, 1),
                username:"",
                show:false,
                BirthDay:"",
                strCardNo:"",
                year: '年',
                month: '月',
                date:"日",
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
                this.dateTimeshow=false;
                this.$toast.success("取消选择");
            },
            ondateConfirm( value){
                this.dateTimeshow=false;
                this.BirthDay=formatDate(value,"yyyy-MM-dd");
            },

            change_picker_show(){
                this.dateTimeshow=true;
            },
            select_sex(){
                this.show=true;
            },
            formatter(type, value) {
                if (type === 'year') {
                    return value + this.year;
                }
                if (type === 'month') {
                    return value + this.month;
                }
                if (type === 'day') {
                    return value + this.date;
                }
                return value;
            },
            up_register(){
                if (this.username === "") {
                    this.$toast("用户名不能空");
                } else if (this.sex === ''){
                    this.$toast("性别未选择");
                } else if (this.phone === '') {
                    this.$toast("电话不能空");
                }  else if (this.BirthDay === '') {
                    this.$toast("生日未选择");
                }else {
                    if (!/^1[3456789]\d{9}$/.test(this.phone)) {
                        this.$toast("手机号格式不对");
                    } else if (/[0-9]/.test(this.username)) {
                        this.$toast("用户名不能包含数字");
                    } else {
                        const toastr = this.$toast.loading({
                            duration: 0,
                            forbidClick: true,
                            loadingType: 'spinner',
                            message: "正在注册"
                        });
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
                                    this.$toast.clear();
                                    this.$router.push({
                                        name: 'post_msg',
                                        params: {
                                            name: this.username,
                                            phone: this.phone,
                                            BirthDay:this.BirthDay,
                                            strSex: this.sex,
                                            strCardNo:this.strCardNo
                                        }
                                    })
                                }else{
                                    if(response.data.result.status==="success") {
                                        // this.$toast("该用户未注册，请到注册界面注册!");

                                        this.$toast(respny.data.result.data.Exception + ",请到登录界面登录!");
                                    }else
                                    {

                                        this.$toast("注册失败,请重试");
                                    }
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


