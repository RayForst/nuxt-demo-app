<template lang="pug">
  .recent-posts.px-2-sm.px-0-lg
    .row.center-xs
      .col-xs-12
        .offset-heading
          h2.offset-heading__text {{ heading }}
        .spacer
      .col-xs-12.col-sm-10.col-lg-12
        .row.col-gap-4-sm.col-gap-4-lg.max-xs-item-2.max-sm-item-2.max-md-item-3.max-lg-item-3
          .col-xs-12.col-sm-6.col-md-4(v-for="item in articles")
            app-post(:content="item")
</template>

<script>
import appPost from "@/components/client/Articles/ListItem";

export default {
  name: "recent-posts",
  props: ["heading", "articles"],
  components: {
    appPost
  },
  methods: {
    // async get() {
    //   const response = (await contentService.articles.getRecent({})).data;
    //   this.list.splice(0, this.list.length);
    //   response.forEach(element => {
    //     this.list.push(element);
    //   });
    // }
  },
  mounted() {
    // this.get();
  }
};
</script>

<style lang="scss" scoped>
h2 {
  position: relative;
  background: #fff;
}
</style>
