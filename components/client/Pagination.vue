<template lang="pug">
  ul.pagination(
    v-if="items > 1"
  )
    li(
      v-for="page, index in items" 
      :class="{ active: index === active }"
      @click.prevent="change(index)"
    )
      | {{ page }}
</template>

<script>
export default {
  props: ["total", "perPage"],
  data() {
    return {
      active: 0
    };
  },
  computed: {
    items() {
      return Math.ceil(this.total / this.perPage);
    }
  },
  methods: {
    change(index) {
      this.active = index;
      this.$emit("newpage", index);

      // created by lazy load issue fix
      document
        .querySelectorAll(".products .bg-image")
        .forEach(function(sandwich, index) {
          sandwich.style.backgroundImage = "none";
        });

      // Scroll into view
      document.getElementsByClassName("list")[0].scrollIntoView();

      const offset = window.screen.width < 1000 ? -20 : -60;
      window.scrollBy(0, offset);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

ul.pagination {
  padding: 0;
  margin: 0;
  display: inline-flex;
  list-style-type: none;
  padding: 50px 0;
  padding-bottom: 20px !important;

  li {
    font-size: 20px;
    line-height: 1.2em;
    color: #103324;
    cursor: pointer;
    padding: 12px;

    &:hover {
      background: #103324;
      color: #fff !important;
      transition: all 0.3s ease;
    }

    &.active {
      font-weight: bold;
      text-decoration: underline;
    }
  }
}
</style>
