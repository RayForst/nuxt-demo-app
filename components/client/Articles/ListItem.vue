<template lang="pug">
  .post-list-item(
    @click="$router.push(localePath(`/articles/${content.slug}`))"
  )
    .image-wrap.scale-container
      .bg-image.scale-image(
        :lazy-background="`/uploads/${image}`"
      )
    .vertical-container.item-details
      .name {{ $toLocale(content, 'name', $i18n.locale) }}
      .date {{ date }}
</template>

<script>
import moment from "moment";

export default {
  props: ["content"],
  name: "post-list-item",
  data() {
    return {};
  },
  computed: {
    image() {
      return this.content.hasOwnProperty("image")
        ? this.content.image
        : "default.png";
    },
    date() {
      return moment(this.content.createdAt).format("LL");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.item-details {
  padding-left: 20px;
  padding-right: 20px;

  @media #{$media_sm} {
    padding-left: 0;
    padding-right: 0;
  }
}

.post-list-item {
  cursor: pointer;
  max-width: 400px;
  margin: auto;
  text-align: left;
}

.name {
  font-family: "Lora", sans-serif;
  font-size: 24px;
  line-height: 1.33em;
  margin-bottom: 20px;
}

.date {
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: var(--c_gray);
  text-transform: uppercase;
}

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  display: flex;
  position: relative;

  &:before {
    content: "";
    display: block;
    padding-top: 60%;
    background: #fff;
  }
}

.scale-container {
  position: relative;
  overflow: hidden;

  &:hover {
    .scale-image {
      transform: translate(-50%, -50%) scale(1.15, 1.15);
    }
  }
}

.scale-image {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
}
</style>
