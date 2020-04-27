import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import moment from 'moment'
import vuepreview from 'vue-preview'
Vue.use(vuepreview)
import 'vant/lib/index.css';
import 'lib-flexible'
import { NavBar, 
  Tabbar, 
  TabbarItem,
  Button, 
  GoodsActionIcon, 
  GoodsAction,
  GoodsActionButton,
  Swipe, 
  SwipeItem, 
  Grid, 
  GridItem,
  Icon,
  List,
  Cell, 
  CellGroup,
  Skeleton,
  Panel,
  Form,
  Field,
  Tab, 
  Tabs,
  Toast,
  Stepper,
  Checkbox,
  Image,
  Lazyload,
  PullRefresh
} from 'vant';

Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Button);
Vue.use(GoodsActionIcon);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Skeleton);
Vue.use(Panel);
Vue.use(Form);
Vue.use(Field);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Toast);
Vue.use(Stepper);
Vue.use(Lazyload);
Vue.use(Checkbox);
Vue.use(Image);
Vue.use(PullRefresh);
// 定义全局的过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
