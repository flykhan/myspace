<template>
  <ContentBase>
    <div class="row">
      <div class="col-3">
        <p class="lable-text">用户信息</p>
        <!-- 父组件使用 v-bind 传值给子组件; v-bind 可以省略，直接写为 :user="user" -->
        <!-- @follow @unfollow 配合子组件里使用 context.emit(),用来将子组件信息传给改父组件 -->
        <UserProfileInfo @follow="follow" @unfollow="unfollow" v-bind:user="user" />
        <UserProfileWrite v-if="is_me" @submit_post="submit_post" />
      </div>
      <div class="col-9">
        <p class="lable-text">帖子列表</p>
        <!-- 传入两个参数给 UserProfilePosts.vue -->
        <UserProfilePosts
          @delete_a_post="delete_a_post"
          v-bind:posts="posts"
          v-bind:user="user"
        />
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
// useRoute 用于访问链接里的参数
import { useRoute } from "vue-router";
import $ from "jquery";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "UserProfile",
  components: { ContentBase, UserProfileInfo, UserProfilePosts, UserProfileWrite },
  // setup作为入口函数；这里也可以写成 setup () {}
  setup: () => {
    // 把 useRoute 的对象返回回来
    const route = useRoute();

    // 获取输入并转换为 int 类型后保存
    const userId = parseInt(route.params.userId);
    // console.log(userId);
    // route.params.userId 里的 userId 是与 'router/index.js' 中 'path: '/userprofile/:userId/',' 的 :userId 参数名是一样的
    // console.log(route.params.userId);

    // 定义一个 user 默认值用来调试
    /*     const user = reactive({
      id: 1,
      username: "flykhan",
      lastName: "IO",
      firstName: "flykhan",
      followerCount: 0,
      is_followed: false,
    }); */

    // reactive 类型变量，会在当前值变化时自动更新所有引用该值的组件
    // 下面这个 posts 用于本地调试
    /*     const posts = reactive({
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
    }); */

    const store = useStore();
    const user = reactive({
      id: store.state.user.id,
      username: store.state.user.username,
      photo: store.state.user.photo,
      followerCount: store.state.user.followerCount,
      is_followed: store.state.user.is_followed,
    });

    const posts = reactive({});

    // 获取某个用户的信息
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
      type: "GET",
      data: {
        user_id: userId,
      },
      headers: {
        Authorization: "Bearer " + store.state.user.access,
      },
      success(resp) {
        user.id = resp.id;
        user.username = resp.username;
        user.photo = resp.photo;
        user.followerCount = resp.followerCount;
        user.is_followed = resp.is_followed;
      },
    });

    // 获取某个用户的所有帖子
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/post/",
      type: "GET",
      data: {
        user_id: userId,
      },
      headers: {
        Authorization: "Bearer " + store.state.user.access,
      },
      success(resp) {
        (posts.count = resp.length), (posts.posts = resp);
      },
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

    const delete_a_post = (post_id) => {
      // filter 过滤,会遍历数组里的每一个元素。当当前 post.id 不等于要被删掉的 post_id 时，保留本条 post
      posts.posts = posts.posts.filter((post) => post.id !== post_id);
      posts.count = posts.posts.length;
    };

    // console.log(typeof userId, typeof store.state.user.id);
    // 判断当前选择的用户是否自己
    const is_me = computed(() => userId === store.state.user.id);

    // 需要用到的值都需要 return 出去
    return {
      // key 和 value 名字一样的情况也可以直接写为 user,
      user: user,
      follow,
      unfollow,
      posts,
      submit_post,
      delete_a_post,
      is_me,
    };
  },
};
</script>

<style scoped>
.lable-text {
  font-size: larger;
  font-weight: bolder;
}
</style>
