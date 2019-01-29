<template>
    <div>
        <img src="http://129.204.65.155/img/log.png" class="img_login" />
        <br>
        <br>
        <div  class="cellss">
            <van-row type="flex" justify="space-around" >
                <van-col span="18" >
                    <van-field
                            v-model="phone"
                            label="电话号码"

                            required
                    />
                </van-col>
            </van-row>
            <br>
            <van-row type="flex" justify="space-around" >
                <van-col span="18" >
                    <van-field
                            v-model="name_uer"
                            label="昵称"
                            required

                    />
                </van-col>
            </van-row>
                <br>
                <van-row type="flex" justify="space-around" >
                <van-col span="18" >
                    <van-field
                            v-model="BirthDay"
                            label="生日"
                            is-link arrow-direction="down"
                            @click="change_picker_show"
                            readonly="true"
                            required
                    />
                </van-col>
                </van-row>
                <br>
                    <van-row type="flex" justify="space-around" >
                <van-col span="18" >
                    <van-field
                            v-model="wish"
                            label="心愿填写"
                            placeholder="不超25个汉字或字母"
                            autosize
                            required
                    />
                </van-col>
            </van-row>


        </div>
        <br>
            <van-button round type="primary" @click="requestData">提交</van-button>

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
        <van-popup v-model="toal_show":overlay="true" :close-on-click-overlay="false">
        </van-popup>
    </div>
</template>

<script>
    import { formatDate } from './Dt/Dt';
    export default {
        data(){
            return{
                toal_show:false,
                pic_s:"",
                currentDate: new Date(1990, 0, 1),
                dateTimeshow:false,
                year: '年',
                month: '月',
                date:"日",
                minDate: new Date(1950, 0, 1),
                putinmsg:"",
                value:"",
                Ssex:"",
                BirthDay:"",
                name_uer:"",
                strCardNo:"",
                phone:"",
                wish:"",
                show:false
            }
        },
        methods:{
            ondateConfirm( value){
                this.dateTimeshow=false;
                this.toal_show=false;
                this.BirthDay=formatDate(value,"yyyy-MM-dd");
            },
            ondateCancel(){
                this.dateTimeshow=false;
                this.toal_show=false;
                this.$toast.success("取消选择");
            },
            change_picker_show(){
                this.dateTimeshow=true;
                this.toal_show=true;
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
            onConfirm(picker, value){
                // this.$toast(`当前值：${value}, 当前索引：${index}`);
                this.show=false;
                this.wish=this.columns[value];
            },
            onCancel(){
                this.show=false;
                this.$toast.success("取消选择");
            },
            requestData(){
                if (!/^1[3456789]\d{9}$/.test(this.phone)) {
                    this.$toast("手机号格式不对");
                }else if (this.name_uer === "") {
                    this.$toast("昵称不能空");
                }else if (this.name_uer.length >10) {
                    this.$toast("昵称不能超过10个字,请删除");
                } else if (this.BirthDay === '') {
                    this.$toast("生日未选择");
                }else if (this.wish===""){
                this.$toast("愿望未填写");
                }else if(this.wish.length>25){
                        this.$toast("愿望填写超过25个字,请删除");
                }else {
                        console.log(this.wish.length);
                    const toast = this.$toast.loading({
                        duration: 0,
                        forbidClick: true,
                        loadingType: 'spinner',
                        message: "正在验证"
                    });
                    this.$ajax.get('/app/Nayajavaee/Houtai',{
                        params:{
                            strName:this.name_uer,
                            BirthDay:this.BirthDay,
                            wish:this.wish,
                            strSex:"124",
                            strCardNo:"no00001",
                            head:"twe",
                            phone:this.phone
                        }
                    })
                        .then(resp => {
                            console.log(resp.data.id);
                            if(resp.data.status==="ok"){
                                this.pic_s=resp.data.id;
                                this.$ajax.get('/app/Servicehoutai/Client', {
                                    params: {
                                        name: "1",
                                        id: resp.data.num,
                                        flg: "ok"
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
                                                this.$router.push({
                                                    name: 'post_resp',
                                                    params: {
                                                        name: this.name_uer,
                                                        picid:this.pic_s,
                                                    }
                                                })
                                            }else{
                                                toast.message = "设备断线，请稍后重试！";
                                            }
                                            const timer = setInterval(() => {
                                                    clearInterval(timer);
                                                    this.$toast.clear();
                                            }, 1000);
                                           // this.$toast.clear();
                                        } else {
                                            toast.message = resp.data.jieguo;
                                            this.$toast.clear();
                                        }
                                    }).catch(err => {             //
                                    console.log('请求失败：' + err.status + ',' + err.statusText);
                                    toast.message = "请求失败";
                                    this.$toast.clear();
                                })
                            }else {
                                this.$toast(`请求失败，请检查是否填写电话号码！`);
                            }
                        }).catch(err => {             //
                        console.log('请求失败：'+err.status+','+err.statusText);
                        this.$toast(`网络连接失败，请重试！`);
                    });
                }
    },
        },
    }
</script>
<style >
    .overlay_toal{
        background: url("../assets/toast.png")no-repeat center ;
        background-size: contain;
    }
</style>

