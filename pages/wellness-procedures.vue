<template lang="pug">
.page-preview
    .content-container.content
      .row.center-xs
        .col-xs-10.col-sm-8.heading
          h1 {{ $t('wellness_procedures_title') }}
          p {{ $t('wellness_procedures_desc') }}
      app-list(:items="items" :small="true")
      .spacer
    app-subscribe
</template>

<script>
import appSubscribe from "@/components/client/Subscribe";
import appList from "@/components/client/pagePreview/List";

export default {
  async asyncData({ app }) {
    try {
      let items = [];

      const menu = await app.$api("get", "static/menu", {});

      items = menu.filter(item => {
        return item.menupos === 2;
      });

      return { items };
    } catch (err) {
      console.log(err.path, err.statusMessage);
    }
  },
  head() {
    return {
      title: "Wellness Procedures"
    };
  },
  components: {
    appSubscribe,
    appList
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  display: flex;
  background-color: var(--c_primary);

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
    background: #fff;
  }
}

.heading {
  h1 {
    font-size: 36px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.28em;
    letter-spacing: normal;
    color: #000;
  }

  p {
    margin: 0;
    white-space: pre-wrap;
    line-height: 1.5em;
    font-size: 18px;
    margin-bottom: 50px;
  }
}
</style>
