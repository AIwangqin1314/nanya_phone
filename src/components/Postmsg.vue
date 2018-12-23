<template>
    <div>
        <!--<audio src="/audios/brithday.mp3" autoplay loop></audio>-->
        <img src="http://129.204.65.155/img/log.png" class="img_login" />
    <h4>填写心愿会出现您的2019年运势哦！</h4>
    <br>
        <div  class="cellss">
            <van-row type="flex" justify="space-around" >
                <van-col span="18" >
                    <van-field
                            v-model="name_uer"
                            label="用户名"
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
            <van-button type="primary" @click="requestData">提交</van-button>

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
    </div>
</template>

<script>
    import global_ from './Dt/Global'
    import { formatDate } from './Dt/Dt';
    export default {
        data(){
            return{
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
                columns: ['手机', 'iPad', '苹果', '电视', '洗衣机'],
                show:false
            }
        },
        methods:{
            ondateConfirm( value){
                this.dateTimeshow=false;
                this.BirthDay=formatDate(value,"yyyy-MM-dd");
            },
            ondateCancel(){
                this.dateTimeshow=false;
                this.$toast.success("取消选择");
            },
            change_picker_show(){
                this.dateTimeshow=true;
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
            onConfirm(picker, value, index){
                // this.$toast(`当前值：${value}, 当前索引：${index}`);
                this.show=false;
                this.wish=this.columns[value];
            },
            onCancel(){
                this.show=false;
                this.$toast.success("取消选择");
            },
            requestData(){
                if (this.name_uer === "") {
                    this.$toast("用户名不能空");
                }else if (this.name_uer.length >10) {
                    this.$toast("用户名不能超过10个字,请删除");
                } else if (this.BirthDay === '') {
                    this.$toast("生日未选择");
                }else if (this.wish===""){
                this.$toast("愿望未填写");
                }else if(this.wish.length>25){
                        this.$toast("愿望填写超过25个字,请删除");
                    }else {
                        console.log(this.wish.length);
                    this.$ajax.get('/app/Nayajavaee/Houtai',{
                        params:{
                            strName:this.name_uer,
                            BirthDay:this.BirthDay,
                            wish:this.wish,
                            strSex:this.Ssex,
                            strCardNo:this.strCardNo,
                            head:"twe",
                            phone:this.phone
                        }
                    })
                        .then(resp => {
                            console.log(resp.data.id);
                            if(resp.data.status==="ok"){
                                global_.token=resp.data.id;
                                this.$router.push({
                                    name: 'post_resp',
                                    params: {
                                        name: this.name_uer,
                                        picid: resp.data.id,
                                    }
                                })

                            }else {
                                this.$toast(`您已经提交过愿望了，请勿重复提交`);
                            }
                        }).catch(err => {             //
                        console.log('请求失败：'+err.status+','+err.statusText);
                        this.$toast(`网络连接失败，请重试！`);
                    });
                }
    },
        },
        mounted:function(){
            this.name_uer=this.$route.params.name;
            this.BirthDay=this.$route.params.BirthDay.substr(0,10);
            this.phone=this.$route.params.phone;
            this.strCardNo=this.$route.params.strCardNo;
            this.Ssex=this.$route.params.strSex;
            console.log(this.Ssex);
        }
    }
</script>
<style >
</style>

