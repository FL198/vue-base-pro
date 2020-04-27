<template>
  <div id="app">
    <van-nav-bar
      :title="$route.meta.title"
      @click-left="changeRouter"
    >
      <van-icon
        v-if="$route.meta.arrow_flag"
        slot="left"
        name="arrow-left"
      />
    </van-nav-bar>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item
        replace
        to="/home"
        icon="home-o"
      >
        首页
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/member"
        icon="friends-o"
      >
        会员
      </van-tabbar-item>
      <van-tabbar-item
        id="cartEdge"
        replace
        to="/cart"
        icon="shopping-cart-o"
        :info="$store.getters.getAllNumber"
      >
        购物车
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/search"
        icon="search"
      >
        搜索
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  methods: {
    changeRouter() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  padding: 46px 0 51px 0;
  .van-nav-bar {
    background-color: #26a2ff;
    width: 100%;
    position: fixed;
    top: 0;
    .van-icon-arrow-left::before {
      color: #fff;
    }
  }
  .van-nav-bar__title {
    color: #fff;
    font-size: 16px;
  }
  .van-tabbar--fixed {
    border-top: 1px solid #ccc;
    .van-tabbar-item--active {
      background-color: #eaeaea;
    }
  }
}
</style>
