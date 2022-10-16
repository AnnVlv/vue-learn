<template>
  <input type="text" :value="modelValue" @input="onInput">
</template>

<script>
export default {
  name: 'app-input',
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    onInput(event) {
      const { target: { value }} = event;
      this.$emit('update:modelValue', value);
    },
  },
};
</script>

<style scoped>
input {
  padding: 5px;
  border: 1px solid black;
}
</style>
