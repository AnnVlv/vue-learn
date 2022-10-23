<template>
  <post-item
      v-if="posts.length"
      v-for="post in posts"
      :post="post"
      :actions="POST_ITEM_ACTIONS"
      :key="post.id"
      @openPost="openPost(post.id)"
      @deletePost="deletePost(post)"
  />
  <div v-else>No posts yet.</div>
</template>

<script>
import PostItem from '@/features/post/components/PostItem';
import {ROUTES} from '@/router';

const POST_ITEM_ACTIONS = [
  { name: 'open', },
  { name: 'delete', },
];

export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    POST_ITEM_ACTIONS: POST_ITEM_ACTIONS,
  }),
  methods: {
    openPost(postId) {
      this.$router.push(`${ROUTES.POSTS}/${postId}`);
    },
    deletePost(post) {
      this.$emit('deletePost', post);
    },
  },
};
</script>

<style scoped>

</style>
