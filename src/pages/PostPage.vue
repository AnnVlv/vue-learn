<template>
  <h1 class="title">Post</h1>

  <div v-if="isPostLoading">Loading...</div>
  <div v-else>
    <post-item
        v-if="post"
        :post="post"
    />
    <div v-else>No post.</div>
  </div>
</template>

<script>
import {PostAPIService} from '@/features/post/services/postAPIService';
import {PostAdapterService} from '@/features/post/services/postAdapterService';
import PostItem from '@/features/post/components/PostItem';

export default {
  components: {
    PostItem,
  },
  data() {
    return {
      post: null,
      isPostLoading: false,
    };
  },
  mounted() {
    const postId = this.getPostIdParam();
    this.fetchPost(postId);
  },
  methods: {
    async fetchPost(postId) {
      this.isPostLoading = true;
      try {
        const response = await PostAPIService.getPost(postId);
        this.post = PostAdapterService.adaptAPIPost(response.data);
      } catch {
      } finally {
        this.isPostLoading = false;
      }
    },
    getPostIdParam() {
      return this.$route.params['id'];
    },
  },
};
</script>

<style scoped>
.title {
  margin: 15px 0;
  text-align: center;
}
</style>
