<template>
  <div class="wrapper">
    <h1 class="title">Posts</h1>

    <app-button
        @click="setIsAddPostModalVisible(true)"
        class="add-post-button"
    >
      Add post
    </app-button>

    <app-modal v-model:isVisible="isAddPostModalVisible">
      <post-form :title="'Add post'" @addPost="addPostHandler"/>
    </app-modal>

    <PostList :posts="posts" @deletePost="deletePost"/>
  </div>
</template>

<script>
import PostList from '@/features/post/PostList';
import PostForm from '@/features/post/PostForm';

const INITIAL_POSTS = [
  {id: 1, title: 'Lama 1', content: 'Lama text text text text text text text text',},
  {id: 2, title: 'Lama 2', content: 'Lama text lama text text text text text lama text text',},
  {id: 3, title: 'Lama 3', content: 'Lama text lama text text text text text text lama',},
];

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: INITIAL_POSTS,
      isAddPostModalVisible: false,
    };
  },
  methods: {
    setIsAddPostModalVisible(isAddPostModalVisible) {
      this.isAddPostModalVisible = isAddPostModalVisible;
    },
    addPostHandler(post) {
      this.addPost(post);
      this.setIsAddPostModalVisible(false);
    },
    addPost(post) {
      this.posts.push(post);
    },
    deletePost(post) {
      this.posts = this.posts.filter(p => p !== post);
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 0 15px;
}

.title {
  margin: 15px 0;
  text-align: center;
}

.add-post-button {
  margin: 15px 0 15px auto;
  display: block;
}
</style>
