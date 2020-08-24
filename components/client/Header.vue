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
                img(v-lazy-load data-src="/icons/phone-footer.svg" alt="")
                | {{ phone }}
            .menu-line
            .horizontal-container.cart-container
              nuxt-link.cart(
                :to="localePath(`/cart`)"
                :title="$t('cart.title')"
              )
                img(v-lazy-load data-src="/icons/cart.svg" alt="")
                b(v-if="$store.state.cart.items.length") {{ totalQuantity }}
              .cart-popup(v-if="$store.state.cart.items.length")
                .cart-popup-inner
                  .cart-popup-items
                    .item(v-for="item, i in cartPopupItems" :key="i")
                      span.image()
                        img(v-lazy-load :data-src="`/uploads/${image(item.product)}`")
                      span.details
                        nuxt-link.title(
                          :to="localePath(`/product/${item.product.slug}`)"
                        ) {{ $toLocale(item.product, 'name', $i18n.locale) }} x {{ item.quantity }}
                        span.price  € {{  item.product.price}}
                  .view-all(v-if="$store.state.cart.items.length > 3")
                    nuxt-link(
                      :to="localePath(`/cart`)"
                    ) {{ $t('cartPopup.viewAll') }} ({{ totalQuantity }})
                  .subtotal
                    span {{ $t('cartPopup.subtotal') }}
                    span {{ totalCount }} EUR
                  nuxt-link.ui-button.ui-button--full-green(:to="localePath(`/cart`)") {{ $t('cartPopup.goToCheckoutButton') }}
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
    ...mapGetters("cart", ["totalQuantity", "totalCount"]),
    cartPopupItems() {
      return [...this.$store.state.cart.items].reverse().slice(0, 3);
    }
  },
  components: {
    appLogo,
    appLanguage,
    appSocialButtons
  },
  methods: {
    image(item) {
      return item.hasOwnProperty("images")
        ? item.images.split(",")[0]
        : "default.png";
    }
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

  .cart-container {
    padding: 0 4px;
    position: relative;

    .cart-popup {
      display: none;

      @media #{$media_lg} {
        padding-top: 40px;
        transform: translateY(-40px);

        &-inner {
          padding: 20px 23px;
          background: #fff;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
        }
        .ui-button {
          width: 100%;
          box-sizing: border-box;
        }
        .view-all {
          text-align: center;
          a {
            padding: 10px;
            padding: 10px;
            padding-top: 20px;
            display: flex;
            justify-content: center;
            color: #0f3324;
            font-size: 12px;
            padding-top: 20px;
          }
        }
        .subtotal {
          display: flex;
          justify-content: space-between;
          margin: 21px 0 30px 0;

          span {
            &:first-child {
              font-family: Lora;
              font-style: normal;
              font-weight: normal;
              font-size: 10px;
              line-height: 20px;
              letter-spacing: 1px;
              text-transform: uppercase;
              color: #000000;
            }

            &:last-child {
              font-size: 15px;
              line-height: 20px;
              text-align: right;

              color: #000000;
            }
          }
        }
        .item {
          display: grid;
          grid-template-columns: 40px 1fr;
          padding: 20px 0;
          gap: 17px;
          border-bottom: 1px solid #d6d9da;
          align-items: center;

          &:first-child {
            padding-top: 0;
          }

          .details {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .image {
            float: left;
            overflow: hidden;
            clear: both;
            margin-right: 20px;

            @media #{$media_lg} {
              float: none;
              margin-right: 0;
              // transform: translateY(-15px);
            }

            height: 40px;
            width: 40px;
            display: inline-flex;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .title {
            font-family: Lora;
            font-style: normal;
            font-weight: normal;
            font-size: 10px;
            line-height: 1.3em;
            text-decoration: none;
            /* identical to box height, or 100% */

            color: #000000;
          }
          .price {
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 10px;
            line-height: 1.4em;
            color: #103324;
            margin-top: 7px;
          }
        }
      }
    }

    &:hover {
      .cart-popup {
        @keyframes popup {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @media #{$media_lg} {
          position: absolute;
          top: 40px;
          right: 0;
          display: inline-flex;
          flex-direction: column;
          width: 300px;
          animation: popup 0.3s linear normal;
          animation-fill-mode: forwards;
        }
      }
    }

    @media only screen and (min-width: 400px) {
      padding: 0 10px;
    }

    @media only screen and (min-width: 700px) {
      padding: 0 20px;
    }
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
  position: relative;
  z-index: 3;
  width: 16px;
  height: 16px;

  b {
    line-height: 19px;
    display: inline-flex;
    margin-left: 9px;

    width: 18px;
    height: 18px;
    display: inline-flex;
    background: #db696a;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: absolute;
    top: -10px;
    right: -14px;
    overflow: hidden;
    text-align: center;
    font-size: 10px;
    line-height: 18px;
  }
}
</style>
