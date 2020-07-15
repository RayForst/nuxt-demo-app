<template lang="pug">
  li.menu-item(
    @mouseover="open" 
    @mouseleave="close"
  )
    template(v-if="hasSubcategory")
      span.main-link.text-upper.has-dropdown(
        @click="close" 
        :to="{ name: menuItem.link }"
        :class="{ active: hover }"
      ) 
        | {{ translateName(menuItem) }} 
        i.icon-down
      transition(name="fade" mode="out-in")
        span.popup(
          @mouseleave="close"
          v-show="hover"
          :class="{ first: this.isFirst, last: this.isLast }"
        )
          ul.popup-links
            li(v-for="link in menuItem.links")
              nuxt-link.submenu-link.text-upper(
                v-if="link.hasOwnProperty('i18n')"
                :to="url(link)"
              ) {{ $t(link.title) }} 
              nuxt-link.submenu-link.text-upper(
                v-else
                :to="url(link)"
              ) {{ $toLocale(link, "title", $i18n.locale) }}
    template(v-else)
      nuxt-link.main-link.text-upper(
        :to="localePath(menuItem.link)"
      ) {{ translateName(menuItem) }}
</template>

<script>
export default {
  name: "menu-item",
  props: ["menuItem", "isLast", "isFirst"],
  data() {
    return {
      hover: false
    };
  },
  computed: {
    hasSubcategory() {
      return !this.menuItem.link;
    }
  },
  methods: {
    url(link) {
      if (link.route.hasOwnProperty("slug") && link.route.slug) {
        return this.localePath(`/${link.route.name}/${link.route.slug}`);
      } else return this.localePath(`${link.route.name}`);
    },
    translateName(menuItem) {
      return menuItem.hasOwnProperty("i18n")
        ? this.$t(menuItem.category)
        : this.$toLocale(menuItem, "category", this.$i18n.locale);
    },
    text(link) {
      return link.hasOwnProperty("i18n")
        ? this.$t(link.title)
        : this.$toLocale(link, "title", this.$i18n.locale);
    },
    open() {
      this.hover = true;
    },
    close($event) {
      this.hover = false;
    },
    test() {}
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

li {
  position: relative;
}

.menu-item {
  border-bottom: 1px solid rgba(#9c9d9d, 0.2);

  @media #{$media_lg} {
    border-bottom: none;
  }

  &:hover {
    .main-link {
      opacity: 0.6;
    }
  }
}

.main-link {
  position: relative;
  z-index: 0;
  transition: opacity 0.3s ease;
  letter-spacing: 0.05em;

  &.active {
    color: var(--c_secondary);
  }
}

.popup {
  font-size: 12px;
  position: absolute;
  top: 100%;
  width: 260px;
  padding: 0 10px;
  box-sizing: border-box;
  z-index: 1000;
  padding-left: 0;
  padding-right: 0;
  left: 50%;
  transform: translate(-50%, -10px);

  &.last {
    right: 0;
    left: auto;
    transform: none;
    transform: translateY(-10px);
  }

  &.first {
    left: 0;
    transform: none;
    transform: translateY(-10px);
  }
}

ul.popup-links {
  margin: 0;
  padding: 10px 0;
  position: relative;
  z-index: 2;
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  background: #fff;

  li {
    padding: 0;
    cursor: pointer;
  }

  a {
    padding: 10px 20px;

    &:hover {
      background: #e9ebec;
      color: #324148;
    }
  }
}

.burger__menu .submenu-link {
  font-size: 12px;
  color: #9b9b9b;
  font-family: "Montserrat", sans-serif;
  line-height: 18px;
}

i.icon-down {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #0f3324;
  position: absolute;
  right: -17px;
  top: 50%;
  transform: translateY(-50%);
}

.has-dropdown {
  cursor: ns-resize;
}
</style>
