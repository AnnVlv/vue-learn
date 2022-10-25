<template>
  <h1 class="title">Posts</h1>

  <div class="filters">
    <app-input
        :modelValue="searchQuery"
        @update:modelValue="setSearchQuery"
        placeholder="Search"
    />
    <app-select
        :options="sortOptions"
        :modelValue="sortType"
        @update:modelValue="setSortType"
    />
    <app-select
        :options="limitOptions"
        :modelValue="limit"
        @update:modelValue="setLimit"
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
          :modelValue="page"
          @update:modelValue="setPage"
      />
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
import {DEFAULT_PAGE} from '@/store/postsModule';
import PostList from '@/features/post/components/PostList';
import PostForm from '@/features/post/components/PostForm';
import {LIMIT_OPTIONS, SORT_OPTIONS} from '@/features/post/const';


export default {
  components: {
    PostList,
    PostForm,
  },
  computed: {
    ...mapState({
      isPostsLoading: state => state.postsModule.isPostsLoading,
      sortType: state => state.postsModule.sortType,
      searchQuery: state => state.postsModule.searchQuery,
      page: state => state.postsModule.page,
      pageCount: state => state.postsModule.pageCount,
      limit: state => state.postsModule.limit,
    }),
    ...mapGetters({
      sortedAndSearchedPosts: 'postsModule/sortedAndSearchedPosts',
    }),
  },
  data: () => ({
    isAddPostModalOpened: false,
    sortOptions: SORT_OPTIONS,
    limitOptions: LIMIT_OPTIONS,
  }),
  mounted() {
    this.fetchPosts();
  },
  methods: {
    ...mapMutations({
      addPost: 'postsModule/addPost',
      deletePost: 'postsModule/deletePost',
      setSortType: 'postsModule/setSortType',
      setSearchQuery: 'postsModule/setSearchQuery',
      setPage: 'postsModule/setPage',
      setPageCount: 'postsModule/setPageCount',
      setLimit: 'postsModule/setLimit',
    }),
    ...mapActions({
      fetchPosts: 'postsModule/fetchPosts',
    }),
    setIsAddPostModalOpened(isAddPostModalOpened) {
      this.isAddPostModalOpened = isAddPostModalOpened;
    },
    addPostHandler(postForm) {
      this.addPost(postForm);
      this.setIsAddPostModalOpened(false);
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
