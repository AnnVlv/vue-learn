<template>
  <div class="pagination">
    <div
        v-for="page of pageCount"
        :key="page"
        @click="onPageClick(page)"
        class="page"
        :class="{
          current: page === modelValue,
        }"
    >{{ page }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-pagination',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onPageClick(page) {
      this.$emit('update:modelValue', page);
    },
  },
}
</script>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
}

.page {
  padding: 2px;
  width: 24px;
  height: 24px;
  border: 1px solid grey;
  margin: 5px 5px 5px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page:hover {
  background: grey;
  color: white;
}

.page.current {
  background: aqua;
  border: none;
}
</style>
