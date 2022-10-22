<template>
  <div class="post">
    <h2 class="post__title">#{{ post.id }} {{ post.title }}</h2>
    <div class="post__body">{{ post.content }}</div>

    <div class="post__actions">
      <app-button
          v-for="action of actions"
          :key="action.name"
          @click="onActionClick(action.name)"
      >
        {{ actionTitles[action.name] }}
      </app-button>
    </div>
  </div>
</template>

<script>
import {toUppercaseCaseFirstLetter} from '@/helpers';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    actions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      actionTitles: { },
    };
  },
  mounted() {
    this.setActionTitles();
  },
  methods: {
    setActionTitles() {
      this.actionTitles = this.actions.reduce((titles, action) => {
        titles[action.name] = toUppercaseCaseFirstLetter(action.name);
        return titles;
      }, { });
    },
    onActionClick(actionName) {
      this.$emit(`${actionName}Post`);
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

.post__actions * {
  margin-right: 10px;
}

.post__actions *:last-of-type {
  margin-right: 0;
}
</style>
