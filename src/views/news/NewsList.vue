<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getNewsInfo"
    >
      <van-cell
        v-for="item in Newslist"
        :key="item.id"
        :icon="item.img_url"
        :to="'/NewsInfo/'+item.id"
      >
        <template slot="title">
          <span class="custom-title">{{ item.title }}</span>
        </template>
        <template
          id="desc"
          slot="label"
        >
          <span class="custom-title">发表时间：{{ item.add_time|dateFormat }}</span>
          <span class="custom-title">点击：{{ item.click }}次</span>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { NewsListUrl } from '@/tools/api'
import flaxios from '@/tools/flaxios'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      Newslist: []
    }
  },
  created() {
    this.getNewsInfo()
  },
  methods: {
    async getNewsInfo() {
      const infos = await flaxios('GET', NewsListUrl)
      this.Newslist = infos.message
      this.finished = true
    }
  }
}
</script>

<style lang="less" scoped>
.van-list {
  .van-cell {
    .van-cell__left-icon {
      font-size: 42px;
    }
    margin: 10px 0;
    .van-cell__title {
      width: 302px;
      font-weight: bold;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .van-cell__label {
        display: flex;
        justify-content: space-between;
        .custom-title {
          font-weight: normal;
        }
      }
    }
  }
}
</style>
