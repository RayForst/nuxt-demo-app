<template lang="pug">
div.coupon
  template(v-if="!coupon")
    input.ui-input(
        type="text" 
        :placeholder="$t('orderDetails.promoCodeInputPlaceholder')"
        v-model="couponCode"
        name="code"
    )
    button(
      type="button"
      @click.prevent="save"
    ).ui-button {{ $t('orderDetails.promoCodeButton') }}
    p.coupon-desc.error(v-if="error") Wrong coupon code
    p.coupon-desc(v-else) {{ $t('orderDetails.promoDescription') }}
  template(v-else)
    h3.success 
      | YOUR coupon: 
      b {{ couponCode }}
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "apply-code",
  data() {
    return {
      couponCode: "",
      error: false
    };
  },
  computed: {
    ...mapGetters("checkout", ["coupon"])
  },
  methods: {
    async save() {
      this.error = false;
      let code = this.couponCode;

      const response = await this.$api("get", "settings/coupon", {
        params: {
          code
        }
      });

      if (response) {
        this.saveCoupon(code);
      } else {
        this.error = true;
      }

      return true;
    },
    ...mapMutations({
      saveCoupon: "checkout/addCoupon"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

div.coupon {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 11px;
  margin-bottom: 104px;

  input {
    background: #ffffff;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 12px;
    color: #000000;
    padding: 0 20px;
    height: 41px;
  }
  p {
    font-family: Lora;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 15px;

    color: #969696;
  }

  @media #{$media_md} {
    grid-template-columns: 1fr 130px;
  }

  .error {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }

  .success {
    color: green;
  }
}
</style>
