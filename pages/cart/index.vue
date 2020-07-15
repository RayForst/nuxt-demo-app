<template lang="pug">
.checkout.container.content-container
    h1 Your Cart
    .your-cart_items
        .item
            span 
            span 
            span Price
            span(style="text-align:center;") quantity
            span total
        .item(v-for="item, i in $store.state.cart.items" :key="i")
            span.image
                img(:src="`/uploads/${image(item.product)}`")
            span.details 
                nuxt-link.title(
                  :to="localePath(`/product/${item.product.slug}`)"
                ) {{ $toLocale(item.product, 'name', $i18n.locale) }}
                span.caption {{ $toLocale(item.product.ProductSubcategory, 'name', $i18n.locale) }}
            span.price  € 10.00
            span.qnt
              app-product-quantity(
                @quantityChange="changeQuantity(...arguments, item)"
                :defaultValue="item.quantity"
              )
              .cart-item-delete(
                @click="deleteItem(item.product)"
              )
                img(src="/icons/delete.svg")
                span Delete
            span.total € {{ total(10.00, item.quantity ) }}
        template(v-if="$store.state.cart.items.length === 0")
          .no-items
            | No items in yout cart yet
    .your-cart_total
        .count
            span.subtotal subtotal
            span.value € {{ totalCount  }}.00 EUR
        .caption Shipping and taxes calculated at checkout
        nuxt-link(:to="localePath(`/checkout`)").ui-button.ui-button--big.ui-button--full-green Buy Now
</template>

<script>
import { mapGetters } from "vuex";
import appProductQuantity from "@/components/client/Quantity";

export default {
  scrollToTop: true,
  methods: {
    image(item) {
      return item.hasOwnProperty("images")
        ? item.images.split(",")[0]
        : "default.png";
    },
    total(price, qnt) {
      return parseFloat((price * qnt).toFixed(2));
    },
    changeQuantity(quantity, item) {
      this.$store.commit("cart/add", {
        product: item.product,
        qnt: quantity
      });
    },
    deleteItem(item) {
      if (confirm("Vai tiešām vēlaties dzēst?")) {
        this.$store.commit("cart/delete", item);
      }
    }
  },
  computed: {
    ...mapGetters("cart", ["totalCount"])
  },
  components: {
    appProductQuantity
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.checkout {
  border-top: 1px solid #d6d9da;
  padding-bottom: 110px;

  h1 {
    font-family: Lora;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 41px;
    color: #000000;
    margin: 0;
  }
}

.your-cart {
  &_items {
    margin-bottom: 65px;

    .item {
      border-bottom: 1px solid #d6d9da;
      padding: 20px 0 25px 0;

      @media #{$media_lg} {
        padding: 45px 0 30px 0;
        display: grid;
        grid-template-columns: 120px 4fr 1fr 1fr 1fr;
      }
      &:first-child {
        text-transform: uppercase;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 1px;
        color: #000000;
        padding: 0;
        border-bottom: 0;
        opacity: 0.5;
        visibility: hidden;

        @media #{$media_lg} {
          visibility: visible;
        }

        span:last-child {
          text-align: right;
        }
      }

      .image {
        float: left;
        overflow: hidden;
        clear: both;
        margin-right: 20px;

        @media #{$media_lg} {
          float: none;
          margin-right: 0;
          transform: translateY(-15px);
        }

        height: 120px;
        width: 120px;
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
        font-size: 18px;
        line-height: 28px;
        color: #000000;
        text-decoration: none;

        @media #{$media_lg} {
          margin-bottom: 25px;
        }

        &:hover {
          text-decoration: underline;
        }
      }

      .caption {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 24px;
        color: #4a4a4a;
      }

      .price,
      .qnt,
      .total {
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 14px;
        color: #103324;
      }

      .price {
        font-weight: 300;
        font-size: 20px;
        padding: 20px 0;
        display: block;

        @media #{$media_lg} {
          padding: 0;
          font-size: 14px;
        }
      }

      .total {
        text-align: right;
        display: none;

        @media #{$media_lg} {
          display: block;
        }
      }
    }
    .details {
      display: flex;
      flex-direction: column;

      @media #{$media_lg} {
        margin-left: 40px;
      }
    }
    &-small {
      .item {
        grid-template-columns: 120px 2fr 1fr;
      }
    }
  }

  &_total {
    text-align: right;

    width: 290px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    @media #{$media_lg} {
      margin: 0;
      margin-left: auto;
    }
    .count {
      display: flex;

      button {
        width: 100%;
      }
    }
    .value {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 14px;
      /* identical to box height, or 78% */

      text-align: right;

      color: #000000;
    }

    .subtotal {
      font-family: Lora;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: 1px;
      text-transform: uppercase;

      color: #000000;

      opacity: 0.5;
      margin-right: auto;
    }

    .caption {
      font-family: Lora;
      font-style: italic;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      margin: 35px 0 30px 0;
      /* identical to box height */

      color: #000000;

      opacity: 0.5;
    }
  }
}

.no-items {
  font-family: Lora;
  font-size: 24px;
  padding: 30px 0;
}

.cart-item-delete {
  text-align: center;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  padding: 15px 0;
  cursor: pointer;

  img {
    margin-right: 6px;
  }

  &:hover {
    text-decoration: underline;
  }

  @media #{$media_lg} {
    justify-content: center;
  }
}

.qnt {
  display: flex;
  justify-content: space-between;

  @media #{$media_lg} {
    flex-direction: column;
    justify-content: unset;
  }
}
</style>
