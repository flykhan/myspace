<template>
  <div class="card">
    <div class="card-body">
      <!-- v-for 配合 v-bind 实现循环操作 -->
      <div v-for="post in posts.posts" v-bind:key="post.id">
        <div class="card single-post">
          <div class="card-body">{{ post.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfilePosts",
  props: {
    posts: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.single-post {
  margin-bottom: 10px;
}
</style>
