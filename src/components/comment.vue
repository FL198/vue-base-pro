<template>
  <div class="comment">
    <h4>发表评论</h4>
    <van-form @submit="onSubmit">
      <van-field
        v-model="msg"
        rows="4"
        autosize
        type="textarea"
        placeholder="请输入您需要发表的评论"
        :rules="[{ required: true, message: '请输入内容' }]"
      />
      <div style="margin: 16px 0;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
        >
          发表评论
        </van-button>
      </div>
    </van-form>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getComments"
    >
      <van-cell
        v-for="(item,idx) in commentList"
        :key="idx"
      >
        <template slot="title">
          <div class="custom-title">
            第{{ idx+1 }}楼 {{ item.user_name }} 时间 {{ item.add_time|dateFormat }}
          </div>
        </template>
        <template slot="label">
          <div class="custom-title">
            {{ item.content }}
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { GetCommentsUrl, SendCommentUrl } from '@/tools/api'
import flaxios from '@/tools/flaxios'
export default {
  data() {
    return {
      pageIndex: 1,
      id: this.$route.params.id,
      msg: '',
      commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onSubmit() {
      const obj = {
        id: this.id,
        user_name: '匿名用户',
        content: this.msg
      }
      this.commentList.unshift(obj)
      this.sendComments(obj)
    },
    async getComments() {
      const list = await flaxios('GET', GetCommentsUrl + this.id,
        {
          params: { pageindex: this.pageIndex }
        })
      this.loading = false
      if (list.message.length == 0) {
        this.finished = true
        return
      }
      this.commentList = [...this.commentList, ...list.message]
      this.pageIndex++
    },
    async sendComments(obj) {
      const res = await flaxios('POST', SendCommentUrl + this.id, obj)
      this.msg = ''
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  padding: 15px;
  .van-form {
    .van-cell {
      border: 1px solid #ccc;
    }
  }
  .custom-title {
    font-size: 13px;
    font-weight: normal;
  }
  .van-button {
    border-radius: 3px;
  }
}
</style>
