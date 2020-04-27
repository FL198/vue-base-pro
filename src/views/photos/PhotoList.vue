<template>
  <div>
    <van-tabs
      v-model="activeName"
      animated
      @click="changeContent"
    >
      <van-tab
        v-for="item in catelist"
        :key="item.id"
        :name="item.id"
        :title="item.title"
      >
        <ul>
          <router-link
            v-for="list in detail"
            :key="list.id"
            :to="'/PhotoDetail/'+list.id"
            tag="li"
          >
            <img :src="list.img_url">
            <div class="desc">
              <p>{{ list.title }}</p>
              <div>{{ list.zhaiyao }}</div>
            </div>
          </router-link>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { GetImgCategoryUrl, GetImgUrl } from '@/tools/api'
import flaxios from '@/tools/flaxios'
export default {
  data() {
    return {
      catelist: [],
      detail: [],
      activeName: 0
    }
  },
  created() {
    this.getImgCategory()
    this.getImg()
  },
  methods: {
    async getImgCategory() {
      const list = await flaxios('GET', GetImgCategoryUrl)
      this.catelist = list.message
      const obj = {
        title: '全部',
        id: 0
      }
      this.catelist.unshift(obj)
    },
    async getImg() {
      const list = await flaxios('GET', GetImgUrl + this.activeName)
      this.detail = list.message
    },
    changeContent(name, title) {
      this.activeName = name
      this.getImg()
    }
  }
}
</script>

<style lang="less" scoped>
  ul{
    padding: 24px;
    li{
      box-shadow: 0 0 11px #999;
      margin: 10px 0;
      position: relative;
      img{
        width: 100%;
      }
      .desc{
        padding: 0 3px;
        background-color: rgba(0, 0, 0, 0.4);
        p{
          font-size: 14px;
          font-weight: bold;
          margin: 0;
        }
        line-height: 1.4;
        font-size: 13px;
        max-height: 90px;
        overflow: auto;
        color: #fff;
        position: absolute;
        bottom: 0;
      }
    }
  }
</style>
