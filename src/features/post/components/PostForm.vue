<template>
  <form class="post-form" @submit.prevent="onSubmit">
    <h2 class="title">{{ actionName }} Post</h2>
    <app-input v-focus placeholder="Title" v-model="post.title" class="input"></app-input>
    <app-input placeholder="Content" v-model="post.content" class="input"></app-input>
    <app-button>{{ actionName }}</app-button>
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
    actionName: {
      type: String,
    },
  },
  data: () => ({
    post: { ...INITIAL_POST },
  }),
  methods: {
    resetPostForm() {
      this.post = { ...INITIAL_POST };
    },
    onSubmit() {
      this.$emit('onSubmit', this.post);
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
