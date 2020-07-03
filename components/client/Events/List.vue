<template lang="pug">
  .recent-posts.px-2-sm.px-0-lg
    .row.center-xs
      .col-xs-12.col-sm-10.col-lg-12
        .row.col-gap-3-sm.max-xs-item-2.max-sm-item-2.max-md-item-3.max-lg-item-4
          .col-xs-12.col-sm-6.col-md-6(v-for="item in items")
            app-item(:content="item")
</template>

<script>
import appItem from "@/components/client/Events/ListItem";

export default {
  name: "events",
  props: ["items"],
  data() {
    return {};
  },
  components: {
    appItem
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";
</style>
