<template>
  <div>
    <van-cell-group>
      <van-cell size="large">
        <template slot="title">
          <span
            id="title"
            class="custom-title"
          >{{ detail.title }}</span>
        </template>
        <template slot="label">
          <span class="custom-title">{{ detail.add_time|dateFormat }}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell>
      <template slot="default">
        <span
          class="custom-title"
          v-html="detail.content"
        />
      </template>
    </van-cell>
    <comment />
  </div>
</template>

<script>
import flaxios from '@/tools/flaxios'
import { NewsInfoUrl } from '@/tools/api'
import comment from '@/components/comment.vue'
export default {
  components: {
    comment
  },
  data() {
    return {
      id: '',
      detail: ''
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getInfoDetail()
  },
  methods: {
    async getInfoDetail() {
      const info = await flaxios('GET', NewsInfoUrl + this.id)
      this.detail = info.message[0]
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell {
  text-align: center;
  .van-cell__title {
    font-weight: bold;
    .van-cell__label {
      font-weight: normal;
      text-align: right;
    }
  }
  .van-cell__value {
    color: #8f8f94;
    p {
      margin: 0;
    }
  }
  #title{
    color: red;
  }
}
</style>
