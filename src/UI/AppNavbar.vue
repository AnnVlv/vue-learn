<template>
  <div class="navbar">
    <router-link
        v-for="item of items"
        :key="item"
        :to="item.path"
        exact
        @click="navigate(item.path)"
        active-class="active"
        class="nav-item"
    >
      {{ item.title }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'app-navbar',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    navigate(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  background: aqua;
  padding: 0 15px;
}

.nav-item {
  padding: 20px;
  cursor: pointer;
}

.nav-item:hover {
  background: cadetblue;
}

.nav-item.active {
  background: aquamarine;
}
</style>
