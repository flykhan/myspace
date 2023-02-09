<template>
  <div class="card edit-field">
    <div class="card-body">
      <label for="edit-post" class="form-label lable-text">编辑帖子</label>
      <!-- v-model 将 textarea 和 content 的内容绑定起来 -->
      <textarea v-model="content" class="form-control" id="edit-post" rows="3"></textarea>
      <!-- v-on:click 等同于 @click -->
      <button
        v-on:click="submit_post"
        type="button"
        class="btn btn-primary btn-sm float-end"
      >
        发帖
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import $ from "jquery";
import { useStore } from "vuex";

export default {
  name: "UserProfileWrite",
  setup: (props, context) => {
    const store = useStore();
    // ref 获取变量
    let content = ref("");
    const submit_post = () => {
      // 创建一个帖子
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "POST",
        data: {
          content: content.value,
        },
        headers: {
          Authorization: "Bearer " + store.state.user.access,
        },
        success(resp) {
          if (resp.result === "success") {
            //   console.log(content.value);
            // 触发父组件 submit_post 事件，然后父组件 submit_post 事件调用父组件的 submit_post 函数，参数为 content
            context.emit("submit_post", content.value);
            content.value = "";
          }
        },
      });
    };

    return {
      content,
      submit_post,
    };
  },
};
</script>

<style scoped>
.edit-field {
  margin-top: 20px;
}
button {
  margin-top: 10px;
}
.lable-text {
  font-size: larger;
  font-weight: bolder;
}
</style>
