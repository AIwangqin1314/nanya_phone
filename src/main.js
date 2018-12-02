import Vue from 'vue'
import App from './App.vue'
import { Button, Cell,Field } from 'vant';
import router from './router/router';
import { Picker } from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';
import { Lazyload } from 'vant';
import axios from 'axios'
Vue.prototype.$ajax = axios;

Vue.use(Lazyload,{
    preLoad: 1.3,
    loading: 'dist/brithday.png'
});
Vue.use(Popup);
Vue.use(Toast);
Vue.prototype.$toast = Toast;
Vue.use(Picker);
Vue.use(Field);
Vue.use(Button);
Vue.use(Cell);
Vue.config.productionTip = false

new Vue({
    router,
  render: h => h(App),
}).$mount('#app')
