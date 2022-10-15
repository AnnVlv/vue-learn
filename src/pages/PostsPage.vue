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

    <div v-if="isPostsLoading">Loading...</div>
    <PostList v-else :posts="posts" @deletePost="deletePost"/>
  </div>
</template>

<script>
import axios from 'axios';
import PostList from '@/features/post/PostList';
import PostForm from '@/features/post/PostForm';
import {delay} from '@/helpers';

const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=3';

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      isPostsLoading: false,
      isAddPostModalVisible: false,
    };
  },
  mounted() {
    this.fetchPosts();
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
    async fetchPosts() {
      this.isPostsLoading = true;
      try {
        await delay();
        const response = await axios.get(POSTS_API_URL);
        this.posts = this.adaptAPIPosts(response.data);
      } catch {
      } finally {
        this.isPostsLoading = false;
      }
    },
    adaptAPIPosts(APIPosts) {
      return APIPosts.map(post => {
        const { id, title, body } = post;
        return { id, title, content: body, };
      });
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
