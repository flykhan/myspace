<template>
  <div class="card">
    <div class="card-body">
      <!-- v-for 配合 v-bind 实现循环操作 -->
      <div v-for="post in posts.posts" v-bind:key="post.id">
        <div class="card single-post">
          <div class="card-body">
            {{ post.content }}
            <button
              v-if="is_me"
              type="button"
              class="btn btn-danger btn-sm"
              @click="delete_a_post(post.id)"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "UserProfilePosts",

  // UserProfileView.vue 传入参数
  props: {
    // 参数名
    posts: {
      // 参数类型
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  // 传入上段的 props 参数
  setup(props, context) {
    // let 是变量, const 是常量
    let is_me = computed(() => store.state.user.id === props.user.id);
    // store 存储当前登录用户信息
    const store = useStore();

    // 触发父组件 UserProfileView.vue 里的 delete_a_post 函数。后端（服务器）删除一个帖子
    const delete_a_post = (post_id) => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "DELETE",
        data: {
          post_id: post_id,
        },
        headers: {
          Authorization: "Bearer " + store.state.user.access,
        },
        success(resp) {
          if (resp.result === "success") {
            context.emit("delete_a_post", post_id);
          }
        },
      });
    };

    // 在前端删除,仅前端调试使用
    // const delete_a_post = (post_id) => {
    //   context.emit("delete_a_post", post_id);
    // };

    return {
      is_me,
      delete_a_post,
    };
  },
};
</script>

<style scoped>
.single-post {
  margin-bottom: 10px;
}

button {
  /* 向右浮动 */
  float: right;
}
</style>
