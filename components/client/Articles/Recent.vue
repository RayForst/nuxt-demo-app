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
.image-wrap.article-small {
  min-width: 110px;
  width: 110px;
  height: 60px;
  margin-right: 20px;

  &:before {
    padding-top: 54%;
  }
}

.article-wrap {
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  text-decoration: none;

  &:hover {
    .name {
      color: #000;
    }
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
}
</style>
