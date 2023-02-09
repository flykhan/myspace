<template>
  <ContentBase>
    <!-- justify-content-md-center 用于本 row 域内容居中 -->
    <div class="row justify-content-md-center">
      <div class="col-3">
        <!-- submit="login" 为login表单提交时要执行的事件 -->
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <!-- 使用 v-model="username" 将文本框的 username 和 ref 获取到的 username 绑定起来 -->
            <input v-model="username" type="text" class="form-control" id="username" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
            />
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">确认密码</label>
            <input
              v-model="password_confirm"
              type="password"
              class="form-control"
              id="password_confirm"
            />
          </div>
          <div class="error-message">{{ error_message }}</div>
          <!-- 通过设置 button=>width:100% 达到和 .d-grid=>.btn-block 同样的效果 -->
          <button type="submit" class="btn btn-primary">注册</button>
          <!-- 通过添加 .btn-block 类可以设置块级按钮，.d-grid 类设置在父级元素中 -->
          <!--    <div class="d-grid">
                    <button type="submit" class="btn btn-primary btn-block">登录</button>
                  </div> -->
        </form>
      </div>
    </div>
  </ContentBase>
</template>

<script>
// @ is an alias to /src
import ContentBase from "../components/ContentBase";
// 动态获取用户名和密码需要用到 ref(响应式变量) 并使用双向绑定
import { ref } from "vue";
import { useStore } from "vuex";
// 引入 router 用于写入页面跳转,(router.push的内容与NavBar里定义的跳转内容是一致的)
import router from "@/router/index";
import $ from "jquery";

export default {
  name: "RegisterView",
  components: {
    ContentBase,
  },
  // 警告：粗心导致的一个 bug ,把 setup 错写成了 start
  setup: () => {
    // 定义store ,以使用 store 对数据进行读写
    const store = useStore();

    // console.log(store, router);
    let username = ref("");
    let password = ref("");
    let password_confirm = ref("");
    let error_message = ref("");
    const register = () => {
      // 先清空上次输入错误的 error_message
      error_message.value = "";
      // console.log(username.value, password.value, password_confirm.value);
      // 注册账号
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/user/",
        type: "POST",
        data: {
          username: username.value,
          password: password.value,
          password_confirm: password_confirm.value,
        },
        success(resp) {
          // console.log(resp);
          // 如果注册成功,则直接以当前注册的账号登录
          if (resp.result === "success") {
            store.dispatch("login", {
              username: username.value,
              password: password.value,
              // 这里的 success() 会作为回调函数,传给 user.js 里的 data 参数
              success() {
                // console.log("success");
                // 如果输入的用户名和密码匹配数据库用户名和密码，则跳转到用户列表界面
                // router.push({name:""}) 用于跳转
                router.push({ name: "userlist" });
              },
              error() {
                error_message.value = "系统异常，请稍后重试";
              },
            });
          } else {
            // 输出注册信息错误提示
            error_message.value = resp.result;
          }
        },
      });
    };

    return {
      username,
      password,
      password_confirm,
      error_message,
      register,
    };
  },
};
</script>

<style scoped>
button {
  width: 100%;
}
.error-message {
  color: red;
}
</style>
