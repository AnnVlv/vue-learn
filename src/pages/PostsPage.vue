<template>
  <div class="wrapper">
    <h1 class="title">Posts</h1>

    <div class="filters">
      <div>Filters</div>
      <app-select
          :options="sortOptions"
          v-model:modelValue="sortType"
      ></app-select>
    </div>

    <app-button
        @click="setIsAddPostModalVisible(true)"
        class="add-post-button"
    >
      Add post
    </app-button>

    <app-modal v-model:isVisible="isAddPostModalVisible">
      <post-form :title="'Add post'" @addPost="addPostHandler"/>
    </app-modal>

    <div v-if="isPostsLoading">Loading...</div>
    <PostList v-else :posts="sortedPosts" @deletePost="deletePost"/>
  </div>
</template>

<script>
import axios from 'axios';
import PostList from '@/features/post/PostList';
import PostForm from '@/features/post/PostForm';
import {delay} from '@/helpers';

const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=3';

const SORT_TYPES = {
  NONE: '',
  BY_TITLE: 'title',
  BY_CONTENT: 'content',
};
const DEFAULT_SORT_TYPE = SORT_TYPES.NONE;
const SORT_OPTIONS = [
  {value: SORT_TYPES.NONE, label: 'None',},
  {value: SORT_TYPES.BY_TITLE, label: 'By title',},
  {value: SORT_TYPES.BY_CONTENT, label: 'By content',},
];

export default {
  components: {
    PostList,
    PostForm,
  },
  computed: {
    sortedPosts() {
      return this.sortPosts(this.posts, this.sortType);
    },
  },
  data() {
    return {
      posts: [],
      isPostsLoading: false,
      isAddPostModalVisible: false,
      sortOptions: SORT_OPTIONS,
      sortType: DEFAULT_SORT_TYPE,
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    setIsAddPostModalVisible(isAddPostModalVisible) {
      this.isAddPostModalVisible = isAddPostModalVisible;
    },
    addPostHandler(post) {
      this.addPost(post);
      this.setIsAddPostModalVisible(false);
    },
    addPost(post) {
      this.posts.push(post);
    },
    deletePost(post) {
      this.posts = this.posts.filter(p => p !== post);
    },
    async fetchPosts() {
      this.isPostsLoading = true;
      try {
        await delay();
        const response = await axios.get(POSTS_API_URL);
        this.posts = this.adaptAPIPosts(response.data);
      } catch {
      } finally {
        this.isPostsLoading = false;
      }
    },
    adaptAPIPosts(APIPosts) {
      return APIPosts.map(post => {
        const {id, title, body} = post;
        return {id, title, content: body,};
      });
    },
    sortPosts(posts, sortType) {
      if (sortType === SORT_TYPES.NONE) {
        return posts;
      }
      return [...posts].sort((post1, post2) => post1[sortType].localeCompare(post2[sortType]));
    },
  },
  // watch: {
  //   sortType() {
  //     this.posts = this.sortPosts(this.posts, this.sortType);
  //   },
  // },
};
</script>

<style scoped>
.wrapper {
  padding: 0 15px;
}

.title {
  margin: 15px 0;
  text-align: center;
}

.filters {
  display: flex;
  align-items: center;
}

.filters * {
  margin-right: 15px;
}

.add-post-button {
  margin: 15px 0 15px auto;
  display: block;
}
</style>
