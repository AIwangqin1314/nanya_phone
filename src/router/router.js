import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Postmsg from '../components/Postmsg'
import Postmsgruslui from '../components/Postmsgruslui'
import Login from '../components/Login'
import Register from '../components/Register'
import print from '../components/print'
import get_id from '../components/Getid'

const routes = [
    // { path: '/HelloWorld', component: HelloWorld },
    { path: '/Postmsg', component: Postmsg ,name:"post_msg" },
    { path:'/Postmsgruslui',component:Postmsgruslui,name:"post_resp"},
    { path:'/Login',component:Login},
    { path:'/Register',component:Register},
    { path:'/',component:Login},
    { path:'/print',component:print},
    { path:'/get_id',component:get_id},
    // { path:'/p_content/:aid',component:Xianqing},
    // {
    //     path: '/content',
    //     component: Shanping,
    //     children:[
    //         { path: 'useradd', component: uar },
    //         { path: 'userlist', component: uaa }
    //     ]
    // }
    // // { path: '*', redirect: '/' }   /*默认跳转路由*/
]
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})
export default router;
