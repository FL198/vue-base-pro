import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import home from '../views/home.vue'
const member = () => import('../views/member.vue')
const cart = () => import('../views/cart.vue')
const search = () => import('../views/search.vue')
const NewsList = () => import('../views/news/NewsList.vue')
const NewsInfo = () => import('../views/news/NewsInfo.vue')
const PhotoList = () => import('../views/photos/PhotoList.vue')
const PhotoDetail = () => import('../views/photos/PhotoDetail.vue')
const GoodList = () => import('../views/goods/GoodList.vue')
const GoodCart = () => import('../views/goods/GoodCart.vue')
const GoodDesc = () => import('../views/goods/GoodDesc.vue')

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/member',
    component: member,
    meta: {
      title: '会员中心',
      arrow_flag: false
    }
  },
  {
    path: '/cart',
    component: cart,
    meta: {
      title: '购物车',
      arrow_flag: false
    }
  },
  {
    path: '/search',
    component: search,
    meta: {
      title: '搜索中心',
      arrow_flag: false
    }
  },
  {
    path: '/home',
    component: home,
    meta: {
      title: '首页',
      arrow_flag: false
    }
  },
  {
    path: '/NewsList',
    component: NewsList,
    meta: {
      title: '新闻列表',
      arrow_flag: true
    }
  },
  {
    path: '/NewsInfo/:id',
    component: NewsInfo,
    meta: {
      title: '新闻详情',
      arrow_flag: true
    }
  },
  {
    path: '/PhotoList',
    component: PhotoList,
    meta: {
      title: '图片列表',
      arrow_flag: true
    }
  },
  {
    path: '/PhotoDetail/:id',
    component: PhotoDetail,
    meta: {
      title: '图片详情',
      arrow_flag: true
    }
  },
  {
    path: '/GoodList',
    component: GoodList,
    meta: {
      title: '商品列表',
      arrow_flag: true
    }
  },
  {
    path: '/GoodCart/:id',
    component: GoodCart,
    meta: {
      title: '商品信息',
      arrow_flag: true
    }
  },
  {
    path: '/GoodDesc/:id',
    component: GoodDesc,
    name: 'GoodDesc',
    meta: {
      title: '商品详情',
      arrow_flag: true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
