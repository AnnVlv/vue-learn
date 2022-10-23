<template>
  <h1 class="title">{{ title }}</h1>

  <app-input
      :modelValue="title"
      @update:modelValue="setTitle"
      placeholder="Title"
  />
</template>

<script>
export default {
  computed: {
    title() {
      return this.$store.getters.formattedTitle;
    },
  },
  methods: {
    setTitle(title) {
      this.$store.commit('setTitle', title);
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
