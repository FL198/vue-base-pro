<template>
  <div>
    <van-panel>
      <h1>{{ info.title }}</h1>
      <div
        class="content"
        v-html="info.content"
      />
    </van-panel>
  </div>
</template>

<script>
import { GetGoodDescUrl } from '@/tools/api'
import flaxios from '@/tools/flaxios'
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {}
    }
  },
  created() {
    this.getGoodDesc()
  },
  methods: {
    async getGoodDesc() {
      const info = await flaxios('GET', GetGoodDescUrl + this.id)
      this.info = info.message[0]
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell-group{
  padding: 0 10px;
  .van-panel__header{
    padding: 3px 0;
  }
  h1{
    font-size: 15px;
    color:#226aff;
  }
}
.content{
  font-size: 14px;
  color: #515a6e;
}
/deep/.gomeImgLoad{
  width: 343px;
}
</style>
