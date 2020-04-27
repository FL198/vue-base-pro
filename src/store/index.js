import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    deleteGood(state, res) {
      const index = state.cart.findIndex(item => {
        if (item.id == res) {
          return item.id
        }
      })
      this.state.cart.splice(index, 1)
    },
    upDateSelected(state, res) {
      state.cart.forEach(item => {
        if (item.id == res) {
          item.selected = !item.selected
        }
      })
    },
    getCartInfo(state, res) {
      const index = state.cart.findIndex(item => {
        if (item.id == res.id) {
          return item.id
        }
      })
      if (index == -1) {
        state.cart.push(res)
      } else {
        state.cart[index].number += res.number
      }
    },
    upDateNumber(state, res) {
      state.cart.forEach(item => {
        if (item.id == res.id) {
          item.number = res.number
        }
      })
    }
  },
  getters: {
    getTotalPrice(state) {
      let total = 0
      state.cart.forEach(item => {
        if (item.selected == true) {
          total += item.price * item.number
        }
      })
      return total
    },
    hasSelectedNumber(state) {
      let number = 0
      state.cart.forEach(item => {
        if (item.selected == true) {
          number += item.number
        }
      })
      return number
    },
    isChoosed(state) {
      const obj = {
        selected: true
      }
      state.cart.forEach(item => {
        obj[item.id] = item.selected
      })
      return obj
    },
    getAllId(state) {
      const obj = []
      state.cart.forEach(item => {
        obj.push(item.id)
      })
      return obj
    },
    getSingleNumber(state) {
      const obj = {}
      state.cart.forEach(item => {
        obj[item.id] = item.number
      })
      return obj
    },
    getAllNumber(state) {
      let number = 0
      state.cart.forEach(item => {
        number += item.number
      })
      return number
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
