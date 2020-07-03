<template lang="pug">
  header.main.wrapper
   .container
      .row.middle-xs.top-lg
        span.col-xs-4
          app-social-buttons.social-wrap
        span.col-xs-4.text-center
          app-logo
        span.col-xs-4.text-end
          .help
            .horizontal-container
              a.phone(
                :href="'tel:+371'+phone.replace(/ /g, '')"
              )
                img(src="/icons/phone-footer.svg" alt="")
                | {{ phone }}
            .menu-line
            .horizontal-container
              nuxt-link.cart(
                :to="localePath(`/checkout/cart`)"
              )
                img(src="/icons/cart.svg" alt="")
                b {{ totalQuantity }}
            .menu-line
            .lang-container.dropdown-container
              app-language
</template>

<script>
import appLogo from "@/components/client/Logo";
import appLanguage from "@/components/client/Language";
import appSocialButtons from "@/components/client/SocialButtons";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      phone: this.$store.state.settings.settings.phone
    };
  },
  computed: {
    ...mapGetters("cart", ["totalQuantity"])
  },
  components: {
    appLogo,
    appLanguage,
    appSocialButtons
  }
};
</script>

<style lang="scss" soped>
@import "~@/assets/scss/base/_variables";

header {
  z-index: 10;
}

header.main {
  background-color: #ffffff;
  width: 100%;
  box-shadow: 0 2px 10px 0 rgba(24, 55, 92, 0.16);
  z-index: 9000;

  & > .container {
    padding-bottom: 10px;

    @media #{$media_md} {
      padding-bottom: 20px;
    }

    @media #{$media_lg} {
      padding-bottom: 10px;
    }
  }

  @media #{$media_lg} {
    box-shadow: none;
  }
}

.help {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.social-wrap {
  display: none;

  @media #{$media_lg} {
    display: block;
  }
}

.container.dropdown-container {
  padding: 0 10px;
}

.lang-container {
  @media #{$media_lg} {
    padding: 0 20px 0 14px;
  }
}

.menu-line {
  display: none;

  @media #{$media_lg} {
    display: inline-flex;
  }
}

.phone {
  display: none;
  font-family: "Lora", sans-serif;
  color: var(--c_gray2);
  transition: color 0.3s ease;
  text-decoration: none;

  &:hover {
    color: #000;
  }

  @media #{$media_lg} {
    display: inline-flex;
    font-size: 18px;
  }

  img {
    margin-right: 10px;
  }
}

.cart {
  font-size: 12px;
  color: #103324;
  text-decoration: none;
  display: inline-flex;

  b {
    line-height: 19px;
    display: inline-flex;
    margin-left: 9px;
  }
}
</style>
