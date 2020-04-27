<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item
        v-for="item in lunboList"
        :key="item.url"
      >
        <img v-lazy="item.img">
      </van-swipe-item>
    </van-swipe>

    <van-grid column-num="3">
      <van-grid-item
        v-for="item in imageList"
        :key="item.img"
        :icon="item.img"
        :text="item.title"
        :to="item.to"
      />
    </van-grid>
  </div>
</template>

<script>
import flaxios from '@/tools/flaxios'
import { LunboUrl } from '@/tools/api'
export default {
  data() {
    return {
      lunboList: [],
      imageList: [
        {
          img: require('../images/menu1.png'),
          title: '新闻资讯',
          to: '/NewsList'
        },
        {
          img: require('../images/menu2.png'),
          title: '图片分享',
          to: '/PhotoList'
        },
        {
          img: require('../images/menu3.png'),
          title: '商品购买',
          to: '/GoodList'
        },
        {
          img: require('../images/menu4.png'),
          title: '留言反馈'
        },
        {
          img: require('../images/menu5.png'),
          title: '视频专区'
        },
        {
          img: require('../images/menu6.png'),
          title: '联系我们'
        }
      ]
    }
  },
  created() {
    this.getLunbo()
  },
  methods: {
    async getLunbo() {
      const result = await flaxios('GET', LunboUrl)
      this.lunboList = result.message
    }
  }
}
</script>

<style lang="less" scoped>
.van-swipe-item {
  height: 200px;
  img {
    width: 100%;
  }
}
/deep/.van-grid-item__icon {
  font-size: 50px;
}
</style>
