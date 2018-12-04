<template>
    <div>
    <h2>填写信息栏</h2>
    <br>
    {{name_uer}}{{phone}}
    <br>
    <van-cell-group>
        <van-field
                v-model="name_uer"
                label="姓名"
                placeholder="请输入姓名"

        />
        <van-field
                v-model="phone"
                label="手机号"
                type="tel"
                placeholder="请输入手机号"

        />
        <van-field
                v-model="cell_value"
                label="礼物"
                type="tel"
                placeholder="请点击选择"
                @click="change_picker_show"
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
                phone:"",
                name_uer:"",
                cell_value:"",
                columns: ['手机', 'iPad', '苹果', '电视', '洗衣机'],
                show:false
            }
        },
        methods:{
            onConfirm(picker, value, index){
                // this.$toast(`当前值：${value}, 当前索引：${index}`);
                this.show=false;
                this.cell_value=this.columns[value];
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
            requestData(){if (this.name_uer ==="") {
                this.$toast("姓名不能空");
            }else if (this.phone===''){
                this.$toast("电话不能空");
            }else if (this.cell_value===""){
                this.$toast("礼物未选择");
            }else {
                if (!/^1[3456789]\d{9}$/.test(this.phone)) {
                    this.$toast("手机号格式不对");
                }else if (/[0-9]/.test(this.name_uer)){
                    this.$toast("姓名不能包含数字");
                } else {
                    this.$ajax.get('http://129.204.65.155:8080/Nayajavaee/Houtai',{
                        params:{
                            name:this.name_uer,
                            phone:this.phone,
                            gift:this.cell_value
                        }
                    })
                        .then(resp => {
                            console.log(resp.data);
                            // if(resp.data.count_num)this.$router.push({ path:'/Postmsgruslui'});
                            // else
                            //alert(resp.data.count_num);
                            this.$toast(`目前一共有：${resp.data.count_num}人跟您有共同愿望`);
                        }).catch(err => {             //
                        console.log('请求失败：'+err.status+','+err.statusText);
                    });
                }
            }
        // this.$ajax.get('http://localhost:8080/Nayajavaee/Houtai',{
        //     params:{
        //         name:this.name_uer,
        //         phone:this.phone,
        //         gift:this.cell_value
        //     }
        // })
        //     .then(resp => {
        //         console.log(resp.data);
        //         if(resp.data.id)this.$router.push({ path:'/Postmsgruslui'});
        //         else  this.$toast(`当前值：${resp.data.id}`);
        //     }).catch(err => {             //
        //     console.log('请求失败：'+err.status+','+err.statusText);
        // });
    },
        }

    }
</script>

