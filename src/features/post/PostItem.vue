<template>
  <div class="post">
    <h2 class="post__title">#{{ post.id }} {{ post.title }}</h2>
    <div class="post__body">{{ post.content }}</div>

    <div class="post__actions">
      <app-button @click="deletePost">Delete</app-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deletePost() {
      this.$emit('deletePost');
    },
  },
};
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px dashed black;
  margin-bottom: 15px;
}

.post__title {
  text-align: center;
}

.post__body {
  margin: 15px 0;
}

.post__actions {
  text-align: right;
}
</style>
