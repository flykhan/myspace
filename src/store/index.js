import { createStore } from 'vuex'
import ModuleUser from "./user"

export default createStore({
  // state 用来存储变量
  state: {
  },

  // getters 用来做 state 变量值的计算, 只能读取 state 信息并使用，不能修改
  getters: {
  },

  // mutations 用于对 state 直接进行修改
  mutations: {
  },

  // actions 用于对 state 的各种操作,如定义对 state 的更新方式
  // actions 用于复杂修改
  actions: {
  },

  // modules 用于对 state 进行分割，类似于按类型分为模块对象进行维护管理
  modules: {
    user:ModuleUser
  }
});