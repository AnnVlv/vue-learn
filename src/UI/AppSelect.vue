<template>
  <select
      v-model="modelValue"
      @change="onChange"
  >
    <option
        v-for="option of options"
        :value="option.value"
        :disabled="option.disabled"
        :key="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'app-select',
  props: {
    modelValue: {
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onChange(event) {
      const { target: { value }} = event;
      this.$emit('update:modelValue', value);
    },
  },
};
</script>

<style scoped>
select {
  outline: none;
  padding: 5px;
  border: 1px solid black;
}
</style>
