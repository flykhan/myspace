<template>
  <div class="home">
    <!-- text-start 表示内容从页面左侧开始布局 -->
    <div class="container text-start">
      <div class="card">
        <div class="card-body">
          <!-- slot 可以作为子组件的母版 -->
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentBase",
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
</style>
