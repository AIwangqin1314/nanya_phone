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
                placeholder="请输入手机号"

        />
    </van-cell-group>
        <br>
    <van-cell  v-model="cell_value" title="礼物" is-link arrow-direction="down" @click="change_picker_show" />
            <van-button type="primary" @click="postmsg_button">提交</van-button>
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
            }
        }

    }
</script>

