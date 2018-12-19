<template>
    <div>
        <!--<audio src="/audios/brithday.mp3" autoplay loop></audio>-->
        <img src="http://nxha.ynnsd.com/Areas/Pages/Content/images/img_logo.png" class="img_login" />
    <h4>愿望选择</h4>
    <br>
    <van-cell-group id="cell_all" >
        <van-field
                v-model="name_uer"
                label="用户名"

                disabled
        />
        <van-field
                v-model="BirthDay"
                label="星座"


                disabled
        />
        <van-field
                v-model="wish"
                label="愿望填写，不超6个字"
                is-link arrow-direction="down"
                @click="change_picker_show"
                readonly="true"
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
    export default {
        data(){
            return{
                putinmsg:"",
                value:"",
                BirthDay:"",
                name_uer:"",
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
                }else {
                    this.$ajax.get('http://129.204.65.155/Nayajavaee/Houtai',{
                        params:{
                            name:this.name_uer,
                            BirthDay:this.BirthDay,
                            wish:this.wish
                        }
                    })
                        .then(resp => {
                            console.log(resp.data);
                            if(resp.data.wish_id!=null){
                                this.$router.push({ path:'/Postmsgruslui',params:{
                                        wish_id:resp.data.wish_id,
                                        start_id:resp.data.start_id,
                                    }});
                            }else {
                                this.$toast(``);
                            }
                        }).catch(err => {             //
                        console.log('请求失败：'+err.status+','+err.statusText);
                        this.$toast(`网络连接失败，请重试！`);
                    });
                }
    },
        },
        mounted:function(){
            this.name_uer=this.$route.params.strName;
            this.BirthDay=this.$route.params.BirthDay;
        }
    }
</script>
<style>
   #cell_all{
        text-align:left;
    }
</style>

