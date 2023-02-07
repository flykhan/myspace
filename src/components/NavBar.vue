<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">MySpace</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'home' }">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'userlist' }"
              >好友列表</router-link
            >
          </li>
          <!-- 用户动态这里params:{userId:1}对应index里的'/userprofile/:userId/'的参数列表 -->
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'userprofile', params: { userId: 1 } }"
              >用户动态</router-link
            >
          </li>
        </ul>
        <!-- 使用 v-if ,当未登录时,显示“登录”和“注册” -->
        <ul class="navbar-nav" v-if="!$store.state.user.is_login">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">登录</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'register' }">注册</router-link>
          </li>
        </ul>
        <!-- 当已经登录时,显示“@当前账号用户名”和“退出登录” -->
        <ul class="navbar-nav" v-else>
          <li class="nav-item">
            <!-- 使用 $store.state.user.username 获取用户名。点击用户名时打开到 userprofile 页面 -->
            <router-link
              class="nav-link"
              :to="{ name: 'userprofile', params: { userId: $store.state.user.id } }"
              >{{ $store.state.user.username }}</router-link
            >
          </li>
          <li class="nav-item">
            <!-- 退出时不需要跳转，因此将 router-link 修改为 a 标签。点击退出时触发 logout 函数 -->
            <a class="nav-link" style="cursor: pointer" @click="logout">退出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "NavBar",
  setup() {
    const store = useStore();
    const logout = () => {
      store.commit("logout");
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
.navbar-brand {
  font-size: 22px;
}
.nav-link {
  font-size: 15px;
  font-weight: bolder;
}
</style>
