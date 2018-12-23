import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Postmsg from '../components/Postmsg'
import Postmsgruslui from '../components/Postmsgruslui'
import Login from '../components/Login'
import Register from '../components/Register'
import get_id from '../components/Getid'
import first from '../components/first'

const routes = [
    { path: '/Postmsg', component: Postmsg ,name:"post_msg" },
    { path:'/Postmsgruslui',component:Postmsgruslui,name:"post_resp"},
    { path:'/Login',component:Login},
    { path:'/Register',component:Register},
    { path:'/',component:first},
    { path:'/first',component:first},
    { path:'/get_id',component:get_id},

]
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})
export default router;
