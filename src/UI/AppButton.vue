<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'app-button',
};
</script>

<style scoped>
button {
  padding: 5px;
  background: white;
  cursor: pointer;
}

button:hover {
  background: gainsboro;
}
</style>
