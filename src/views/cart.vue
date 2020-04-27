<template>
  <div>
    <van-cell-group
      v-for="item in cartInfo"
      :key="item.id"
    >
      <van-cell>
        <div
          slot="icon"
          class="icon"
        >
          <van-checkbox
            v-model="$store.getters.isChoosed[item.id]"
            @click="checked(item.id)"
          />
          <van-image
            width="170"
            height="170"
            fit="contain"
            :src="item.thumb_path"
          />
        </div>
        <div
          slot="default"
          class="content"
        >
          <p>{{ item.title }}</p>
          <span class="price">¥{{ item.sell_price }}</span>
          <van-stepper
            v-model="$store.getters.getSingleNumber[item.id]"
            @change="valueChanged($event,item.id)"
          />
          <van-button
            type="primary"
            size="small"
            color="#1989fa"
            @click="deleteGood(item.id)"
          >
            删除
          </van-button>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell>
      <div
        slot="title"
        class="title"
      >
        <span>总计{{ $store.getters.getAllNumber }}件</span><br>
        <span>已勾选<span class="fontWeight"> {{ $store.getters.hasSelectedNumber }} </span>件，总价 <span class="fontWeight">¥{{ $store.getters.getTotalPrice }}</span></span>
      </div>
      <div slot="default">
        <van-button type="danger">
          去结算
        </van-button>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { GetCartGoodUrl } from '@/tools/api'
import flaxios from '@/tools/flaxios'
export default {
  data() {
    return {
      cartInfo: []
    }
  },
  created() {
    this.getGoodsInfo()
  },
  methods: {
    async getGoodsInfo() {
      const list = await flaxios('GET', GetCartGoodUrl + this.$store.getters.getAllId.join(','))
      this.cartInfo = list.message
    },
    valueChanged(e, id) {
      const obj = {
        id,
        number: e
      }
      this.$store.commit('upDateNumber', obj)
    },
    checked(id) {
      this.$store.commit('upDateSelected', id)
    },
    deleteGood(id) {
      const index = this.cartInfo.findIndex(item => {
        if (item.id == id) {
          return item.id
        }
      })
      this.cartInfo.splice(index, 1)
      this.$store.commit('deleteGood', id)
    }
  }
}
</script>

<style lang="less" scoped>
  .icon{
    display: flex;
    .van-cell{
      padding: 5px 12px;
    }
    .van-image{
        margin-left: 15px;
      }
  }
  .content{
    margin:20px 0 0 15px;
    p{
      margin: 0;
      line-height: 1;
      font-weight: bold;
    }
    .price{
      color: red;
      font-weight: bold;
    }
    .van-stepper{
      display: inline-block;
      vertical-align: middle;
    }
  }
  .fontWeight{
    font-weight: bold;
    color: red;
  }
</style>
