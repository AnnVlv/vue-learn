<template>
  <h1 class="title">Posts</h1>

  <div class="filters">
    <app-input
        v-model="searchQuery"
        placeholder="Search"
    />
    <app-select
        :options="sortOptions"
        v-model:modelValue="sortType"
    />
    <app-select
        :options="limitOptions"
        v-model:modelValue="limit"
    />
  </div>

  <app-button
      @click="setIsAddPostModalOpened(true)"
      class="add-post-button"
  >
    Add post
  </app-button>
  <app-modal v-model:isOpened="isAddPostModalOpened">
    <post-form
        :actionName="'Add'"
        @onSubmit="addPostHandler"
    />
  </app-modal>

  <div v-if="isPostsLoading">Loading...</div>
  <div v-else>
    <post-list
        :posts="sortedAndSearchedPosts"
        @deletePost="deletePost"
    />
    <div class="pagination">
      <app-pagination
          :pageCount="pageCount"
          v-model="page"
      />
    </div>
  </div>
</template>

<script>
import PostList from '@/features/post/components/PostList';
import PostForm from '@/features/post/components/PostForm';
import {PostAPIService} from '@/features/post/services/postAPIService';
import {PostAdapterService} from '@/features/post/services/postAdapterService';
import {getPageCount} from '@/helpers';

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
const LIMIT_OPTIONS = [
  {value: 3, label: 3,},
  {value: 5, label: 5,},
  {value: 10, label: 10,},
];
const DEFAULT_LIMIT = LIMIT_OPTIONS[0]?.value;
const DEFAULT_PAGE = 1;

export default {
  components: {
    PostList,
    PostForm,
  },
  computed: {
    sortedPosts() {
      return this.sortPosts(this.posts, this.sortType);
    },
    sortedAndSearchedPosts() {
      return this.searchPosts(this.sortedPosts, this.search);
    },
  },
  data() {
    return {
      posts: [],
      isPostsLoading: false,
      isAddPostModalOpened: false,
      sortOptions: SORT_OPTIONS,
      sortType: DEFAULT_SORT_TYPE,
      searchQuery: '',
      page: DEFAULT_PAGE,
      pageCount: 0,
      limit: DEFAULT_LIMIT,
      limitOptions: LIMIT_OPTIONS,
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts(params = this.getPostsParams()) {
      this.isPostsLoading = true;
      try {
        const response = await PostAPIService.getPosts(params);
        this.posts = PostAdapterService.adaptAPIPosts(response.data);
        const postCount = response.headers['x-total-count'];
        this.pageCount = getPageCount(postCount, this.limit);
      } catch {
      } finally {
        this.isPostsLoading = false;
      }
    },
    getPostsParams() {
      const { limit, page } = this;
      return { limit, page };
    },
    setIsAddPostModalOpened(isAddPostModalOpened) {
      this.isAddPostModalOpened = isAddPostModalOpened;
    },
    addPostHandler(postForm) {
      const post = {
        ...postForm,
        id: Date.now(),
      };
      this.addPost(post);
      this.setIsAddPostModalOpened(false);
    },
    addPost(post) {
      this.posts.push(post);
    },
    deletePost(post) {
      this.posts = this.posts.filter(p => p !== post);
    },
    sortPosts(posts, sortType) {
      if (sortType === SORT_TYPES.NONE) {
        return posts;
      }
      return [...posts].sort((post1, post2) =>
          post1[sortType].localeCompare(post2[sortType])
      );
    },
    searchPosts(posts, searchQuery) {
      if (!searchQuery) {
        return posts;
      }
      return posts.filter(p =>
          p.title.trim().toLowerCase().startsWith(searchQuery.trim().toLowerCase())
      );
    },
  },
  watch: {
    limit() {
      if (this.page === DEFAULT_PAGE) {
        this.fetchPosts();
      } else {
        this.page = DEFAULT_PAGE;
      }
    },
    page() {
      this.fetchPosts();
    },
  },
};
</script>

<style scoped>
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

.pagination {
  width: 70%;
  margin: 15px auto;
}
</style>
