<template lang="pug">
.article
  nuxt-link.article-wrap(
    :to="localePath(`/articles/${item.slug}`)"
  )
    .image-wrap.article-small.bg-image(
      :lazy-background="`/uploads/${image}`"
    ) 
    .name(
      v-text="$toLocale(item, 'name', $i18n.locale)"
    )
</template>

<script>
export default {
  name: "recent-post",
  props: ["item"],
  data() {
    return {};
  },
  computed: {
    image() {
      return this.item.hasOwnProperty("image")
        ? this.item.image.split(",")[0]
        : "default.png";
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  &:hover {
    background: #f5f5f5;
  }
  .image-wrap.article-small {
    min-width: 110px;
    width: 110px;
    height: 60px;
    margin-right: 20px;

    &:before {
      padding-top: 54%;
    }
  }
  .name {
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #18375c;
    font-family: "Lora";
    text-align: left;
  }

  .article-wrap {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 15px;

    &:hover {
      .name {
        color: #000;
      }
    }
  }
}
</style>
