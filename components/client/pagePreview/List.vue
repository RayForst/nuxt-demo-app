<template lang="pug">
  .recent-posts.px-2-sm.px-0-lg
    .row.center-xs
      .col-xs-12.col-sm-10.col-lg-12
        .row.col-gap-3-sm
          .col-xs-12.col-sm-6.col-md-4(v-for="item in items")
            app-post(:content="item" :small="small")
</template>

<script>
import appPost from "./ListItem";

export default {
  name: "page-preview",
  props: ["items", "small"],
  data() {
    return {};
  },
  components: {
    appPost
  }
};
</script>
