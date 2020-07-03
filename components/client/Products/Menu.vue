<template lang="pug">
  div.menu
    .menu-xs
      slide-up-down(
        :active="active"
        :duration="400"
      )
        ul(
          @click="toggle"
        )
          li(
            v-for="link, index in links"
          )
            template(
              v-if="index === 0"
            )
              nuxt-link(
                :to="localePath(`/products/${slug}`)"
                exact
              ) 
                b {{ $toLocale(link, 'name', $i18n.locale) }}     
            template(
              v-else
            )
              nuxt-link(
                :class="{ active: index === 0 }"
                :to="localePath(`/products/${slug}/${link.slug}`)"
              )  
                | {{ $toLocale(link, 'name', $i18n.locale) }} 
      .trigger(
        @click="toggle"
      )
        .text
          template(v-if="!active") {{ $t('products.menu') }}
          template(v-else) {{ $t('products.closemenu') }}
    .menu-lg
      ul(@click="toggle")
        li
          nuxt-link(
            :to="localePath(`/products/${slug}`)"
            exact
          )  {{ $t('products.all') }}
        li(v-for="link, index in links")
          nuxt-link(
            :class="{ active: index === 0 }"
            :to="localePath(`/products/${slug}/${link.slug}`)"
          )  {{ $toLocale(link, 'name', $i18n.locale) }}
      ul.lines
        li
          nuxt-link(
            :to="localePath(`/products/${slug}/lines/all`)"
            exact
          )  {{ $t('products.allLines') }}
        li(v-for="link, index in lines")
          nuxt-link(
            :class="{ active: index === 0 }"
            :to="localePath(`/products/${slug}/lines/${link.slug}`)"
          )  {{ $toLocale(link, 'name', $i18n.locale) }}
</template>

<script>
export default {
  props: ["slug", "lines", "links"],
  data() {
    return {
      active: false
    };
  },
  methods: {
    // async get() {
    //   const locale = this.$i18n.locale;

    //   let links = (
    //     await contentService.subcategories.get({
    //       category: this.slug
    //     })
    //   ).data;

    //   let lines = (await contentService.productLines.get()).data;

    //   let field = "name";
    //   if (locale !== "en") field += `_${locale}`;

    //   let alphabeticCompare = function(a, b) {
    //     return a[field].localeCompare(b[field]);
    //   };

    //   links.sort(alphabeticCompare);
    //   lines.sort(alphabeticCompare);

    //   this.links = links;
    //   this.lines = lines;
    // },
    toggle: function() {
      this.active = !this.active;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

li {
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}

a {
  line-height: 20px;
  font-weight: 300;
  text-decoration: none;
  color: #000;
  width: 100%;
  display: flex;
  transition: opacity 0.3s ease;
  text-transform: uppercase;

  &:hover {
    opacity: 0.6;
  }

  &.nuxt-link-active {
    font-weight: bold;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      top: 3px;
      right: -6px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4.5px 0 4.5px 5px;
      border-color: transparent transparent transparent #010332;
    }
  }
}

ul {
  margin: 0;
  padding: 30px 40px;
  list-style-type: none;
  width: 100%;

  @media #{$media_lg} {
    padding: 0;
  }

  &.lines {
    margin-top: 20px;
  }
}

.trigger {
  height: 40px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;

  .text {
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 1px;
    color: #000000;
  }
}

.menu-xs {
  @media #{$media_lg} {
    display: none;
  }
}

.menu-lg {
  display: none;
  height: 100%;
  border-right: 1px solid rgba(50, 65, 72, 0.2);
  flex-direction: column;

  @media #{$media_lg} {
    display: flex;
  }
}

.menu {
  @media #{$media_lg} {
    height: 100%;
    padding-right: 40px;
  }
}
</style>
