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
import {mapActions, mapState} from 'vuex';
import PostItem from '@/features/post/components/PostItem';

export default {
  components: {
    PostItem,
  },
  computed: {
    ...mapState({
      post: state => state.postModule.post,
      isPostLoading: state => state.postModule.isPostLoading,
    }),
  },
  mounted() {
    const postId = this.getPostIdParam();
    this.fetchPost(postId);
  },
  methods: {
    ...mapActions({
      fetchPost: 'postModule/fetchPost',
    }),
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
