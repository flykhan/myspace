<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <img
            class="img-fluid"
            src="https://git.acwing.com/uploads/-/system/user/avatar/6527/avatar.png"
            alt=""
          />
        </div>
        <div class="col-9">
          <!-- 使用{{ 参数名 }}来引用参数 -->
          <div class="username">{{ fullName }}</div>
          <div class="fans">粉丝：{{ user.followerCount }}</div>
          <!-- v-on:click 也可以写为 @click -->
          <button
            v-on:click="follow"
            v-if="!user.is_followed"
            type="button"
            class="btn btn-secondary btn-sm"
          >
            +关注
          </button>
          <button
            @click="unfollow"
            v-if="user.is_followed"
            type="button"
            class="btn btn-primary btn-sm"
          >
            取消关注
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "UserProfileInfo",
  // 子组件使用 props 接收父组件传过来的消息
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup: (props, context) => {
    // 使用 computed 计算 fullName
    let fullName = computed(() => props.user.lastName + " " + props.user.firstName);

    // 定义关注函数
    const follow = () => {
      // console.log 用来打印 console 调试信息
      console.log("follow");
      // context.emit 用来触发父组件的事件
      context.emit("follow");
    };

    const unfollow = () => {
      console.log("unfollow");
      context.emit("unfollow");
    };

    // 函数返回值
    return {
      fullName,
      follow,
      unfollow,
    };
  },
};
</script>

<style scoped>
img {
  border-radius: 50%;
}

.username {
  font-weight: bold;
}

.fans {
  font-weight: 12px;
  color: gray;
}

button {
  padding: 2px 4px;
  font-size: 12px;
}
</style>
