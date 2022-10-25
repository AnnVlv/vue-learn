<template>
  <app-navbar :items="navItems"/>
  <div class="page-wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
import {ROUTES} from '@/router';

export default {
  data: () => ({
    navItems: [
      { title: 'Home', path: ROUTES.HOME, },
      { title: 'Posts (Vuex state)', path: ROUTES.POSTS, },
      { title: 'Posts (local component state)', path: ROUTES.POSTS_LOCAL_STATE, },
    ],
  }),
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>
