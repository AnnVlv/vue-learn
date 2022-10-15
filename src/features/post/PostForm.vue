<template>
  <form class="post-form" @submit.prevent="addPost">
    <h2 v-if="title" class="title">{{ title }}</h2>
    <app-input placeholder="Title" v-model="post.title" class="input"></app-input>
    <app-input placeholder="Content" v-model="post.content" class="input"></app-input>
    <app-button>Add</app-button>
  </form>
</template>

<script>
const INITIAL_TITLE = 'Lama';
const INITIAL_CONTENT = 'Lama text';
const INITIAL_POST = {
  title: INITIAL_TITLE,
  content: INITIAL_CONTENT,
};

export default {
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      post: { ...INITIAL_POST },
    };
  },
  methods: {
    resetPostForm() {
      this.post = { ...INITIAL_POST };
    },
    addPost() {
      const { title, content } = this.post;

      const newPost = {
        id: Date.now(),
        title,
        content,
      };
      this.$emit('addPost', newPost);

      this.resetPostForm();
    },
  },
};
</script>

<style scoped>
.post-form {
  display: flex;
  flex-direction: column;
  max-width: 250px;
  margin: 0 auto;
}

.title {
  text-align: center;
}

.title, .input {
  margin-bottom: 12px;
}
</style>
