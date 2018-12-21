<template>
    <div>
        <!--<audio src="/audios/brithday.mp3" autoplay loop></audio>-->
        <img src="http://nxha.ynnsd.com/Areas/Pages/Content/images/img_logo.png" class="img_login" />
    <h4>新年心愿</h4>
    <br>
    <van-cell-group id="cell_all" >
        <van-field
                v-model="name_uer"
                label="用户名"

                disabled
        />
        <van-field
                v-model="BirthDay"
                label="生日"


                disabled
        />
        <van-field
                v-model="wish"
                label="愿望填写"
                placeholder="不超10个汉字或字母"
                required
        />
    </van-cell-group>
        <br>
    <!--<van-cell  v-model="cell_value" title="礼物" is-link arrow-direction="down" @click="change_picker_show" />-->
            <van-button type="primary" @click="requestData">提交</van-button>
            <van-popup v-model="show" position="bottom" :overlay="false">
                <van-picker
                        show-toolbar
                        title="礼物选择"
                        :columns="columns"
                        @cancel="onCancel"
                        @confirm="onConfirm"
                />
            </van-popup>

    </div>
</template>

<script>
    import global_ from './Dt/Global'
    export default {
        data(){
            return{
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
            onConfirm(picker, value, index){
                // this.$toast(`当前值：${value}, 当前索引：${index}`);
                this.show=false;
                this.wish=this.columns[value];
            },
            onCancel(){
                this.show=false;
                this.$toast.success("取消选择");
            },
            change_picker_show(){
            this.show=true;
            },
            postmsg_button(){
                this.$router.push({ path:'/Postmsgruslui'})
            },
            requestData(){
                    if (this.wish===""){
                this.$toast("愿望未填写");
                }else if(this.wish.length>10){
                        this.$toast("愿望填写超过10个字,请删除");
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
            if (this.Ssex===null) {
                this.Ssex="登录";
            }
            console.log(this.Ssex);
        }
    }
</script>
<style>
   #cell_all{
        text-align:left;
    }
</style>

