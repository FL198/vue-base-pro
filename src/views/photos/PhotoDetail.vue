<template>
  <div>
    <van-cell>
      <template slot="title">
        <span class="custom-title">{{ detail.title }}</span>
      </template>
      <template slot="label">
        <div class="desc">
          <p>{{ detail.add_time|dateFormat }}</p>
          <p>点击:{{ detail.click }}次</p>
        </div>
      </template>
    </van-cell>
    <template>
      <vue-preview
        :slides="thumImg"
        @close="handleClose"
      />
    </template>
    <div
      class="content"
      v-html="detail.content"
    />
  </div>
</template>

<script>
import { GetThumImgs, GetImgInfo } from '@/tools/api'
import flaxios from '@/tools/flaxios'
export default {
  data() {
    return {
      id: this.$route.params.id,
      detail: [],
      thumImg: []
    }
  },
  created() {
    this.getThumImages()
    this.getImageInfo()
  },
  methods: {
    async getThumImages() {
      const list = await flaxios('GET', GetThumImgs + this.id)
      list.message.map(item => {
        item.src=item.src
        item.msrc = item.src
        item.w = 400
        item.h = 200
      })
      this.thumImg = list.message
    },
    async getImageInfo() {
      const list = await flaxios('GET', GetImgInfo + this.id)
      this.detail = list.message[0]
    },
    handleClose() {
      console.log('close event')
    }
  }
}
</script>

<style lang="less" scoped>
  .content{
    padding: 14px;
    font-size: 13px;
    line-height: 2;
  }
  .van-cell__title{
    text-align: center;
    .custom-title{
      color: #26a2ff;
      font-weight: bold;
      font-size: 12px;
    }
  }
  .desc{
    color: #000;
    display: flex;
    justify-content: space-between;
  }
  /deep/figure{
    padding: 0 6px;
    width: 80px;
    display: inline-block;
    margin: 0px;
    img{
      width:100%
    }
  }
</style>
