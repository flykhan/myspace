<template>
  <ContentBase>
    <div class="row">
      <div class="col-3">
        用户信息
        <!-- 父组件使用 v-bind 传值给子组件; v-bind 可以省略，直接写为 :user="user" -->
        <!-- @follow @unfollow 配合子组件里使用 context.emit(),用来将子组件信息传给改父组件 -->
        <UserProfileInfo @follow="follow" @unfollow="unfollow" v-bind:user="user" />
        <UserProfileWrite @submit_post="submit_post" />
      </div>
      <div class="col-9">
        帖子列表
        <UserProfilePosts v-bind:posts="posts" />
      </div>
    </div>
  </ContentBase>
</template>

<script>
// @ is an alias to /src
import ContentBase from "../components/ContentBase.vue";
import UserProfileInfo from "../components/UserProfileInfo.vue";
import UserProfilePosts from "../components/UserProfilePosts.vue";
import UserProfileWrite from "../components/UserProfileWrite.vue";
// reactive 在 vue 里，需要导入 vue 包, reactive 可以用来接收对象
import { reactive } from "vue";

export default {
  name: "UserProfile",
  components: { ContentBase, UserProfileInfo, UserProfilePosts, UserProfileWrite },
  // setup作为入口函数；这里也可以写成 setup () {}
  setup: () => {
    const user = reactive({
      id: 1,
      username: "flykhan",
      lastName: "IO",
      firstName: "flykhan",
      followerCount: 0,
      is_followed: false,
    });

    // reactive 类型变量，会在当前值变化时自动更新所有引用该值的组件
    const posts = reactive({
      count: 3,
      posts: [
        {
          id: 1,
          userId: 1,
          content: "今天上了web课真开心",
        },
        {
          id: 2,
          userId: 1,
          content: "今天上了算法课，更开心了",
        },
        {
          id: 3,
          userId: 1,
          content: "今天上了acwing,开心极了!",
        },
      ],
    });

    const follow = () => {
      // 如果已经关注则 return，否则将关注设为 true
      if (user.is_followed) return;
      user.is_followed = true;
      user.followerCount++;
    };

    const unfollow = () => {
      if (!user.is_followed) return;
      user.is_followed = false;
      user.followerCount--;
    };

    const submit_post = (content) => {
      posts.count++;
      // unshift 用于在最前面添加新内容
      posts.posts.unshift({
        id: posts.count,
        userId: 1,
        content: content,
      });
    };

    // 需要用到的值都需要 return 出去
    return {
      // key 和 value 名字一样的情况也可以直接写为 user,
      user: user,
      follow,
      unfollow,
      posts,
      submit_post,
    };
  },
};
</script>

<style scoped></style>
