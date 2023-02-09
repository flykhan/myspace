<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-3 img-field">
          <img class="img-fluid" :src="user.photo" alt="" />
        </div>
        <div class="col-9">
          <!-- 使用{{ 参数名 }}来引用参数 -->
          <div class="username">
            <p class="text-start">{{ user.username }}</p>
          </div>
          <div class="fans">
            <p class="text-start">粉丝：{{ user.followerCount }}</p>
          </div>
          <!-- v-on:click 也可以写为 @click -->
          <button
            v-on:click="follow"
            v-if="!user.is_followed"
            type="button"
            class="btn btn-secondary btn-sm float-start"
          >
            +关注
          </button>

          <button
            @click="unfollow"
            v-if="user.is_followed"
            type="button"
            class="btn btn-primary btn-sm float-start"
          >
            取消关注
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { computed } from "vue";
import $ from "jquery";
import { useStore } from "vuex";

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
    // let fullName = computed(() => props.user.lastName + " " + props.user.firstName);

    const store = useStore();

    // 定义关注函数
    const follow = () => {
      // console.log 用来打印 console 调试信息
      // console.log("follow");

      // 更新数据库状态。更改关注状态。
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "POST",
        data: {
          target_id: props.user.id,
        },
        headers: {
          Authorization: "Bearer " + store.state.user.access,
        },
        success(resp) {
          if (resp.result === "success") {
            // context.emit 用来触发父组件的事件
            // 若未关注,则关注
            context.emit("follow");
          }
        },
      });
    };

    // 定义取消关注函数
    const unfollow = () => {
      // console.log("unfollow");
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "POST",
        data: {
          target_id: props.user.id,
        },
        headers: {
          Authorization: "Bearer " + store.state.user.access,
        },
        success(resp) {
          if (resp.result === "success") {
            // 若已关注,则取消关注
            context.emit("unfollow");
          }
        },
      });
    };

    // 函数返回值
    return {
      // fullName,
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

/* 头像居中 */
.img-field {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
