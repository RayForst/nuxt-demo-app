<template lang="pug">
    .row.center-xs.start-lg.preview-container
      vue-easy-lightbox(
        v-if="gallery && gallery.length > 1"
        :visible="galleryVisible"
        :imgs="gallery"
        :index="index"
        @hide="handleHide"
      )
      .col-xs-10.col-lg-6.col-padding.col-border
        .product
          .media_sm.row
              .col-xs-6
                .carousel-wrap(v-if="gallery && gallery.length > 1")
                  carousel(
                    loop=true 
                    :items=1
                    :dots="true" 
                    :nav="false"
                  )
                    .square-block(
                      :lazy-background="src"
                      v-for="(src, index) in gallery"
                      @click="() => showImg(index)"
                    )
                .carousel-wrap(v-else)
                  .square-block(
                      :lazy-background="image"
                  )
              .col-xs-6.sm-desc
                .name {{ $toLocale(product, 'name', $i18n.locale) }}
                nuxt-link.desc(
                  :to="`/products/${product.ProductSubcategory.ProductCategory.slug}/${product.ProductSubcategory.slug}`"
                ) {{ $toLocale(product.ProductSubcategory, 'name', $i18n.locale) }}
                .share
                  h5 {{ $t('share') }}
                  .share-list
                    a(href="#").item
                      img(
                        v-lazy-load data-src="/icons/fb-share.svg"
                      )
                    a(href="#").item
                      img(
                        v-lazy-load data-src="/icons/twitter-share.svg"
                      )
          .media_desktop-and-mob
            .row.relative
              .col-xs-12.first-lg
                .name {{ $toLocale(product, 'name', $i18n.locale) }}
                nuxt-link.desc(
                  :to="localePath(`/products/${product.ProductSubcategory.ProductCategory.slug}/${product.ProductSubcategory.slug}`)"
                ) {{ $toLocale(product.ProductSubcategory, 'name', $i18n.locale) }}
              .col-xs-12.first-xs
                .carousel-wrap(v-if="gallery && gallery.length > 1")
                  carousel(
                    loop=true 
                    :items=1
                    :dots="true" 
                    :nav="false"
                  )
                    .square-block(
                      v-for="(src, index) in gallery"
                      :lazy-background="src"
                      @click="() => showImg(index)"
                    )
                .carousel-wrap(v-else)
                  .square-block(
                      :lazy-background="image"
                  )
              .col-xs-12
                .share
                  h5 {{ $t('share') }}
                  .share-list
                    a(href="#").item
                      img(
                        v-lazy-load data-src="/icons/fb-share.svg"
                      )
                    a(href="#").item
                      img(
                        v-lazy-load data-src="/icons/twitter-share.svg"
                      )
                
      .col-xs-10.col-lg-6.pre-line.col-padding
        .tabs-wrap
          .tabs
            template(v-for="tab, key in tabs")
              .tabs-label(
                v-text="$t(tab.title_i18n_key)"
                v-on:click="changeTab(key)"
                :key="key"
                :data-index="key+1"
              )
              transition(name="fade-small" mode="out-in")
                .tabs-content(
                  v-show="tab.active"
                  :key="`${key}_content`"
                  v-html="$toLocale(product, tab.content_i18n_key, $i18n.locale)"
                )
        .quantity-select(
          style="text-align:left;"
        )
          .ui-add-product
            app-product-quantity(
              @quantityChange="changeQuantity"
              :defaultValue="1"
            )
            
            transition(name="fade" mode="out-in")
              .ui-add-product-message(v-show="added")
                | {{ $t('cart.addButtonSuccess') }} 
                nuxt-link(:to="localePath('/cart')") {{ $t('cart.addButtonSuccessLink') }}
                | !

          a(class="ui-button ui-button--cart" @click="addToCart") 
              span.add-title {{ $t('cart.addButton') }}
              span.add-price € {{ product.price }} EUR
</template>

<script>
import appProductQuantity from "@/components/client/Quantity";

export default {
  name: "product-preview",
  props: ["product"],
  data() {
    return {
      gallery: false,
      galleryVisible: false,
      index: 0,
      added: false,
      qnt: 1,
      tabs: [
        {
          title_i18n_key: "products.tab1",
          content_i18n_key: "description",
          active: true
        },
        {
          title_i18n_key: "products.tab2",
          content_i18n_key: "howtouse",
          active: false
        },
        {
          title_i18n_key: "products.tab3",
          content_i18n_key: "ingridients",
          active: false
        }
      ]
    };
  },
  components: {
    appProductQuantity
  },
  methods: {
    changeQuantity(count) {
      this.qnt = count;
    },
    addToCart() {
      this.added = true;
      this.$store.commit("cart/add", {
        product: this.product,
        qnt: this.qnt
      });
    },
    showImg(index, key) {
      this.index = index;
      this.galleryVisible = true;

      document.body.classList.add("hidden-scroll");
    },
    handleHide() {
      this.galleryVisible = false;

      document.body.classList.remove("hidden-scroll");
    },
    changeTab(e) {
      // for (let item of document.querySelectorAll(".tabs-label")) {
      //   item.classList.remove("active");
      // }

      // e.target.classList.add("active");
      this.tabs.forEach((element, index) => {
        this.tabs[index].active = false;
        if (index === e) this.tabs[index].active = true;
      });
    }
  },
  computed: {
    image() {
      const img =
        this.product &&
        this.product.hasOwnProperty("images") &&
        this.product.images.length > 1
          ? this.product.images.split(",")[0]
          : "default.png";

      return "/uploads/" + img;
    }
  },
  mounted() {
    if (
      this.product.images &&
      (this.product.images.indexOf(",") > -1 || this.product.images.length > 1)
    ) {
      this.gallery = this.product.images.split(",").map(function(image) {
        return "/uploads/" + image;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.quantity-select {
  padding-bottom: 40px;
}
.product {
  text-align: left;
  margin-bottom: 50px;
}

.preview-container {
  min-height: 80vh;
}
.media_sm {
  display: none;

  @media #{$media_sm} {
    display: flex;
  }

  @media #{$media_lg} {
    display: none;
  }
}

.media_desktop-and-mob {
  @media #{$media_sm} {
    display: none;
  }

  @media #{$media_lg} {
    display: block;
  }
}

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  background-image: url("https://cdn.shopify.com/s/files/1/1068/2502/products/Shadow-Aloe-Infusion-9oz_d3ec928d-c570-4b86-afb9-f8f985547468.jpg");
  display: flex;
  box-shadow: none;
  margin-bottom: 10px;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
    background: #fff;
  }
}

.sm-desc {
  display: flex;
  flex-direction: column;
  padding: 30px;
}

.name {
  font-family: "Lora", sans-serif;
  font-size: 19px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  margin-bottom: 10px;
  text-transform: uppercase;
  margin-top: 15px;

  @media #{$media_md} {
    font-size: 22px;
  }

  @media #{$media_lg} {
    margin-top: 0;
  }
}

.desc {
  font-size: 16px;
  font-weight: 300;
  line-height: 1.44em;
  color: #7e8f97;
  text-decoration: none;

  @media #{$media_md} {
    font-size: 18px;
  }
}

.share {
  margin-top: auto;

  h5 {
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 1px;
    color: #7e8f97;
    margin-bottom: 20px;
    margin-top: 15px;
    text-transform: uppercase;
  }
}

.share-list {
  display: flex;
  align-items: center;

  .item {
    margin-right: 15px;
  }
}

.col-padding {
  @media #{$media_lg} {
    padding: 50px 60px 65px 60px;
    padding-top: 10px;
  }
}

.col-border {
  @media #{$media_lg} {
    border-right: 1px solid rgba(50, 65, 72, 0.2);
  }
}

.border-top {
  border-top: 1px solid rgba(50, 65, 72, 0.2);
}

.tabs {
  position: relative;

  &-label {
    font-family: "Lora", sans-serif;
    font-size: 14px;
    letter-spacing: 0.086em;
    color: #000000;
    padding: 10px 0;
    position: relative;
    transition: opacity 0.3s ease;
    font-weight: bold;

    &:hover {
      opacity: 0.6;
    }

    @media #{$media_md} {
      font-weight: normal;
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
      margin-bottom: 15px;

      &.active {
        font-weight: bold;
        cursor: default;

        &:before {
          content: "" width 100%;
          position: absolute;
          bottom: 0;
          height: 1px;
          background: #103324;
        }
      }

      &[data-index="2"] {
        left: 50%;
        transform: translateX(-50%);
      }

      &[data-index="3"] {
        right: 0;
        left: auto;
      }
    }
  }

  &-content {
    margin-bottom: 30px;

    @media #{$media_md} {
      margin-bottom: 0;
    }
  }

  @media #{$media_md} {
    padding-top: 70px;

    // &-content {
    //   display: none;
    // }

    // &-label.active + &-content {
    //   display: block;
    // }
  }
}
</style>
