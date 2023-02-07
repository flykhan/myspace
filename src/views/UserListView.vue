<template>
  <ContentBase>
    <div class="card" v-for="user in users" :key="user.id">
      <div class="card-body">
        <div class="row">
          <div class="col-1">
            <!-- :src="user.photo" 是 v-bind:src="user.photo" 的简写 -->
            <!-- 字符串前加 : 冒号,则会将字符串作为变量取值,而不是继续作为字符串使用 -->
            <img class="img-fluid" :src="user.photo" alt="" />
          </div>
          <div class="col-11">
            <div class="username">
              <p class="text-start">{{ user.username }}</p>
            </div>
            <div class="follower-count">
              <p class="text-start">{{ user.followerCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentBase>
</template>

<script>
// @ is an alias to /src
import ContentBase from "../components/ContentBase.vue";
// 导入 jquery 以使用 ajax
import $ from "jquery";
import { ref } from "vue";

export default {
  name: "UserList",
  components: { ContentBase },
  setup() {
    // 定义空 users
    let users = ref([]);

    // 使用 ajax 调用后端 “获取用户列表”api
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/userlist/",
      type: "GET",
      success(resp) {
        // console.log(resp); //用作调试
        users.value = resp;
      },
    });

    return { users };
  },
};
</script>

<style scoped>
img {
  /* border-radius: 50% 则图片会变为圆形 */
  border-radius: 50%;
}

.username {
  font-weight: bold;
  /* height: 50% 表示本行内容占50%的高度 */
  height: 50%;
}

.follower-count {
  font-size: 12px;
  color: gray;
  height: 50%;
}

.card {
  margin-bottom: 10px;

  /* cursor: pointer 鼠标在 .card 区域变为手形显示 */
  cursor: pointer;
}

/* .card:hover 定义鼠标悬浮效果 */
.card:hover {
  /* 阴影效果 : 朝右朝下2像素，扩散10像素，阴影颜色浅蓝色*/
  box-shadow: 2px 2px 10px lightskyblue;
  /* 动画持续毫秒数 */
  transition: 500ms;
}
</style>
