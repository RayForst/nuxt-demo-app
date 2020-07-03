<template lang="pug">
  .callback(
    :class="{open: open}"
  )
    .callback-header(
      @click="open = !open"
    )
      img.callback-icon(
        src="/icons/widget-callback__icon.png"
      )
      .callback-text
        div {{ $t('callback.title') }}
    .callback-form
      app-form
</template>

<script>
import appForm from "./Form";

export default {
  name: "callMeBack",
  data() {
    return {
      open: false,
      value: "+371"
    };
  },
  components: {
    appForm
  },
  methods: {},
  mounted() {
    this.open = true;
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/base/_variables";

.callback {
  background: #103324;
  width: 270px;
  position: fixed;
  margin-left: auto;
  bottom: 0;
  right: 18px;
  color: #fff;
  cursor: pointer;
  transform: translateY(120px);
  transition: all 0.4s;
  line-height: 1.5em;
  display: none;

  &-header {
    padding: 11px 15px 11px 60px;
    position: relative;
  }

  &-icon {
    position: absolute;
    top: 15px;
    left: 20px;
  }

  &.open {
    transform: translateY(0);
  }

  @media #{$media_md} {
    display: block;
  }
}
</style>
