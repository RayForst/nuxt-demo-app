<template lang="pug">
.articles.content-container.content
    app-recent-posts(
        :articles="articles.slice(offset, perPage + offset)"
    )
      app-pagination(
        :total="articles.length" 
        :perPage="perPage" 
        :current="page"
        @newpage="changePage"
      )
    .spacer
</template>

<script>
import appRecentPosts from "@/components/client/Articles/List";
import appPagination from "@/components/client/Pagination";

export default {
  async asyncData({ $axios }) {
    try {
      const articles = await $axios.$get("/articles");

      return { articles };
    } catch (err) {
      console.log(err.path, err.statusMessage);
    }
  },
  data() {
    return {
      perPage: 9,
      page: 0
    };
  },
  components: {
    appRecentPosts,
    appPagination
  },
  computed: {
    offset() {
      return this.page > 0 ? this.page * this.perPage : 0;
    }
  },
  methods: {
    changePage(event) {
      this.page = event;
    }
  }
};
</script>
