<template>
  <div class="wrap">
    <router-link
      v-for="item in goodlist"
      :key="item.id"
      tag="div"
      :to="'/GoodCart/'+item.id"
      class="good"
    >
      <div>
        <img :src="item.img_url">
      </div>
      <h2>{{ item.title }}</h2>
      <div class="desc">
        <span class="price">¥{{ item.sell_price }}</span>
        <del class="ori_price">¥{{ item.market_price }}</del>
        <div id="desc">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </div>
      </div>
    </router-link>
    <van-button
      color="#1989fa"
      type="primary"
      block
      @click="getGoodList"
    >
      加载更多
    </van-button>
  </div>
</template>

<script>
import { GetGoodsUrl } from '@/tools/api'
import flaxios from '@/tools/flaxios'
export default {
  data() {
    return {
      goodlist: [],
      pageindex: 1
    }
  },
  created() {
    this.getGoodList()
  },
  methods: {
    async getGoodList() {
      const list = await flaxios('GET', GetGoodsUrl, {
        params: {
          pageindex: this.pageindex
        }
      })
      if (list.message.length == 0) {
        this.$toast('没有更多数据！')
        return
      }
      this.goodlist = [...this.goodlist, ...list.message]
      this.pageindex++
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap{
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .good{
      border:1px solid #ccc;
      margin: 5px 0;
      box-shadow: 0 0 13px #ccc;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 49%;
      img{
        width: 100%;
      }
      h2{
        font-size: 13px;
        line-height: 1.5;
        margin: 25px 0;
      }
      .desc{
        background-color: #eee;
        padding: 5px;
        .price{
          font-size: 16px;
          color: red;
          font-weight: bold;
        }
        .ori_price{
          margin-left:13px;
          font-size: 12px;
        }
        #desc{
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          font-size: 13px;
        }
      }
    }
  }
</style>
