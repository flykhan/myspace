"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var ModuleUser = {
  state: {
    user: {
      id: "",
      username: "",
      photo: "",
      followerCount: 0
    }
  },
  getters: {// 这行也可以写为 fullName(state){}

    /*  fullName:(state)=>{
          return state.user.firstName + state.user.lastName;
        } */
  },
  mutations: {},
  actions: {
    /* updateUser(context){
         // 假设云端获取的信息存在 resp 里
         // let resp;
         // 下行这种修改 state 内容的方式不合法，如果要通过 resp 内容修改 state 值，必须要在 mutations 里处理
         // context.state.user.username = resp.username; 
    
       } */
  },
  modules: {}
};
var _default = ModuleUser;
exports["default"] = _default;