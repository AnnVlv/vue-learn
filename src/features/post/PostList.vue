<template>
  <post-item
      v-if="posts.length"
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @deletePost="deletePost(post)"
  />
  <div v-else>No posts yet.</div>
</template>

<script>
import PostItem from '@/features/post/PostItem';

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
  methods: {
    deletePost(post) {
      this.$emit('deletePost', post);
    },
  },
};
</script>

<style scoped>

</style>
