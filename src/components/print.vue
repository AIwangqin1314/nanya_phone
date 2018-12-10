<template>
    <div >
        <div id="printTest">
            <!--<img src="./dist/fp.jpg" class="img_login" />-->
            <img src="http://118.24.196.206:8080/dist/fp.jpg"class="img_print">
        </div>
        <!--<button v-print="'#printTest'" @click="printPdf">打印</button>-->
        <button  @click="printPdf">打印</button>
    </div>

</template>

<script>
    import {getLodop} from '../LodopFuncs'
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
//             printPdf() {
//                 this.CreateOneFormPage();
// //        LODOP.PRINT();
//                 LODOP.PREVIEW();
//             },
            printPdf() {

                let  LODOP = getLodop();
                LODOP.PRINT_INIT("订货单");
                LODOP.SET_PRINT_STYLE("FontSize", 18);
                LODOP.SET_PRINT_STYLE("Bold", 1);
                //LODOP.ADD_PRINT_IMAGE(100,100,100,100,"http://118.24.196.206:8080/dist/fp.jpg");
                LODOP.ADD_PRINT_HTM("5mm",34,"RightMargin:0.9cm","BottomMargin:9mm",
                    document.getElementById("printTest").innerHTML);
       LODOP.PRINT();
                LODOP.PREVIEW();
            },
        }
    }
</script>

<style >
.img_print{
    width: 20%;
    height: 20%;
}
</style>
