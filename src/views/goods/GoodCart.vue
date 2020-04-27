<template>
  <div class="cart">
    <van-swipe>
      <van-swipe-item
        v-for="(image, index) in lunboImg"
        :key="index"
      >
        <img v-lazy="image">
      </van-swipe-item>
    </van-swipe>
    <van-panel>
      <div slot="header">
        <p>{{ cartInfo.title }}</p>
        <div class="desc">
          <div class="price">
            <transition
              @before-enter="beforeEnter"
              @enter="enter"
              @after-enter="afterEnter"
            >
              <div
                v-show="ballflag"
                ref="ball"
                class="ball"
              />
            </transition>
            市场价：<del>¥{{ cartInfo.market_price }}</del> 销售价：<span id="price">¥{{ cartInfo.sell_price }}</span>
          </div>
          <div>
            购买数量：<van-stepper v-model="value" />
          </div>
        </div>
      </div>
      <van-goods-action>
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="addCart"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="buyNow"
        />
      </van-goods-action>
    </van-panel>
    <van-panel>
      <div slot="footer">
        <p>商品参数</p>
        <div class="desc">
          <div>商品货号：{{ cartInfo.goods_no }}</div>
          <div>库存情况：{{ cartInfo.stock_quantity }}件</div>
          <div>上架时间：{{ cartInfo.add_time|dateFormat }}</div>
        </div>
        <van-button
          type="primary"
          block
          @click="GoToDesc"
        >
          图文介绍
        </van-button>
      </div>
    </van-panel>
  </div>
</template>

<script>
import { GetCartLunboUrl, GetCartInfoUrl } from '@/tools/api'
import flaxios from '@/tools/flaxios'
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunboImg: [],
      cartInfo: {},
      value: 1,
      ballflag: false,
      animFinished: true
    }
  },
  created() {
    this.getImgInfo()
    this.getGoodInfo()
  },
  methods: {
    beforeEnter(el) {
      el.style.transform = "translate(0px,0px)"
    },
    enter(el, done) {
      el.offsetWidth
      const ballPos = this.$refs.ball.getBoundingClientRect()
      const finalPos = document.querySelector('#cartEdge').getBoundingClientRect()
      const moveX = finalPos.left - ballPos.left + 35
      const moveY = finalPos.top - ballPos.top + 10
      el.style.transform = `translate(${moveX}px,${moveY}px)`
      el.style.transition = "all 1s ease"
      el.addEventListener("transitionend", done)
    },
    afterEnter(el) {
      el.style.transition = null
      this.ballflag = !this.ballflag
      this.animFinished = true
    },
    GoToDesc() {
      this.$router.push({ name: "GoodDesc", params: { id: this.id } })
    },
    addCart() {
      if (this.animFinished) {
        this.animFinished = false
        this.ballflag = !this.ballflag
        const obj = {
          price: this.cartInfo.sell_price,
          number: this.value,
          id: this.id,
          selected: false
        }
        this.$store.commit('getCartInfo', obj)
      }
    },
    buyNow() {
      this.$toast('购买成功')
    },
    async getImgInfo() {
      const list = await flaxios('GET', GetCartLunboUrl + this.id)
      this.lunboImg = list.message
    },
    async getGoodInfo() {
      const list = await flaxios('GET', GetCartInfoUrl + this.id)
      this.cartInfo = list.message[0]
    }
  }
}
</script>

<style lang="less" scoped>
.cart{
  padding: 3px 5px;
  .van-swipe-item{
    width: 100%;
    height: 150px;
    img{
      width: 100%;
    }
  }
}
.van-cell-group{
  padding: 0 10px 15px 10px;
  border:1px solid #eee;
  border-radius: 3px;
  font-size: 13px;
  color: #8f8f94;
  p{
    font-size: 16px;
    color:#323233;
  }
  .desc{
    margin:25px 0 10px 0;
    line-height: 2.7;
      #price{
        color: red;
        font-weight: bold;
      }
      .van-stepper{
        display: inline-block;
        vertical-align: middle;
      }
    }
}
.van-goods-action{
  position: static;
}
.price{
  position: relative;
  .ball{
    width: 15px;
    height: 15px;
    background-color: orange;
    border-radius: 50%;
    position: absolute;
    left: 94px;
    top: 30px;
    z-index: 10;
  }
}
</style>
