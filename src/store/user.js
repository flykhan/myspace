import { setInterval } from "core-js";
import $ from 'jquery';
// 用于解码 jwt 访问令牌 access 中的用户信息
import jwt_decode from 'jwt-decode';

const ModuleUser = {
  state: {
      id: "",
      username: "",
      photo: "",
      followerCount: 0,
      access: "",
      refresh: "",
      is_login: false,
  },
  getters: {
/*  例子如下:
  // 这行也可以写为 fullName(state){}
    fullName:(state)=>{
      return state.user.firstName + state.user.lastName;
    } 
*/
  },


  // mutations 不支持异步 (一般可以简单理解为不访问链接的是同步,需要访问链接的是异步)
  // 将 actions 里获取的信息存到 mutations 里面
  mutations: {
    updateUser(state, user) {
      state.id = user.id;
      state.username = user.username;
      state.photo = user.photo;
      state.followerCount = user.followerCount;
      state.access = user.access;
      state.refresh = user.refresh;
      state.is_login = user.is_login;
    },
    // 更新 access
    updateAccess(state, access) {
      state.access = access;
    },
    // 实现 logout()
    logout(state){
      state.id = "";
      state.username = "";
      state.photo = "";
      state.followerCount = 0;
      state.access = "";
      state.refresh = "";
      state.is_login = false;
    }
  },

  // 在外面调用 actions 里调用的方法，需要使用 dispatch 这个 API
  actions: {
/*  例子如下:
    updateUser(context){
      // 假设云端获取的信息存在 resp 里
      // let resp;
      // 下行这种修改 state 内容的方式不合法，如果要通过 resp 内容修改 state 值，必须要在 mutations 里处理
      // context.state.user.username = resp.username; 

    } 
*/
    login(context,data){
      // 获取Json Web Token（JWT
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/api/token/",
        type: "POST",
        data: {
          username: data.username,
          password: data.password,
        },
        success(resp) {
          // 用于获取 jwt 的访问令牌和刷新令牌信息
          const {access, refresh} = resp;
          const access_obj = jwt_decode(access);
          // console.log(access_obj,refresh);
          
          // 每隔 5 分钟对 access 令牌进行刷新,防止令牌过期导致无法成功登录,第二个参数是刷新的毫秒间隔
          setInterval(() => {
            // 刷新JWT令牌
            $.ajax({
              url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
              type: "POST",
              data: {
                refresh,
              },
              success(resp) {
                // const {access} = resp;
                context.commit('updateAccess', resp.access);
                // console.log(resp);
              }
            });
          }, 4.5 * 60 * 1000);

          // 获取某个用户的信息
          $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "GET",
            // data 里是要传的参数
            data: {
              // 将 access_obj 里获取的 user_id 赋值给 API 需要的参数 user_id
              user_id: access_obj.user_id,
            },
            // headers 用于验证 jwt 信息, 这一条只能在使用需要 jwt 授权的 api 时添加
            headers: {
              // 授权, 注意Bearer 后面要有空格
              'Authorization': "Bearer " + access,
            },
            success(resp) {
              // console.log(resp);
              context.commit("updateUser", {
                // ...作用是把数组或类数组对象展开成一系列用逗号隔开的值
                
                ...resp,    // ...resp 是解构 resp
                access: access,
                refresh: refresh,
                is_login: true,    // 成功之后，把登录状态改为 true
              });
            // 如果成功,则调用执行 LoginView.vue 里的 success() 方法
            data.success();
            },
          })
        },
        error() {
          // 如果失败,则调用执行 LoginView.vue 里的 error() 方法
          data.error();
        }
      });
    },
  },
  modules: {
  }
};

export default ModuleUser;