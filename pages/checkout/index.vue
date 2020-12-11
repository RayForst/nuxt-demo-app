<template lang="pug">
.container.content-container(
  ref="cont"
)
    app-checkout-history(
      :active="steps"
    )
    .checkout
      app-order-preview(
        :shipping="shippingPrice"
        :step="form.step"
      ) 
        transition(name="fade-small" mode="out-in")
          div(v-if="form.step === 1")
            ValidationObserver(
              v-slot="{ passed }"
            )
              form.i-form(
                autocomplete="off"
                v-on:submit.prevent="sendForm"
              )
                .shipping  
                  h2 {{ $t('checkout.customerInformation') }}

                  .ui-box-form.shipping-address_form.form-box
                    ValidationProvider(
                      rules="email"
                      name="email"
                      mode="lazy"
                      v-slot="{ errors, passed, valid, invalid }"
                    ) 
                      .line(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        label {{ $t('checkout.emailLabel') }}
                        .i-form-input(
                          :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                        )
                          input(
                            type="text" 
                            name="email" 
                            v-model="email" 
                            required 
                            :placeholder="$t('checkout.emailPlaceholder')"
                          )
                          span.i-form-error-message {{ errors[0] }}
                    .line.identity
                      label {{ $t('checkout.identityLabel') }}
                      div
                        label.status-select
                          .ui-checkbox
                            input( type="radio" name="payment-type" value="phiz" v-model="form.status")
                            .ui-checkbox-preview
                          .label-text {{ $t('checkout.identityPhys') }}
                        label.status-select
                          .ui-checkbox
                            input( type="radio" name="payment-type" value="jur" v-model="form.status")
                            .ui-checkbox-preview
                          .label-text {{ $t('checkout.identityJur') }}

                .shipping-addr 
                  h2 {{ $t('checkout.shippingAddress') }}

                  .ui-box-form.shipping-address_form.form-box
                    ValidationProvider(
                      rules="alpha"
                      name="First name"
                      v-slot="{ errors, passed, invalid }"
                    )
                      .line(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        label {{ $t('checkout.firstNameLabel') }}
                        .i-form-input(
                          :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                        )
                          input(
                            type="text"
                            v-model="first_name" 
                            name="first_name" 
                            required 
                            :placeholder="$t('checkout.firstNamePlaceholder')"
                          )
                          span.i-form-error-message {{ errors[0] }}

                    ValidationProvider(
                      rules="alpha"
                      name="Last name"
                      v-slot="{ errors, passed, invalid }"
                    )
                      .line(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        label {{ $t('checkout.lastNameLabel') }}
                        .i-form-input(
                          :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                        )
                          input(
                            type="text"
                            v-model="last_name" 
                            name="last_name"  
                            required 
                            :placeholder="$t('checkout.lastNamePlaceholder')"
                          )
                          span.i-form-error-message {{ errors[0] }}
                    
                    template(v-if="form.status == 'jur'")
                      .line
                        label {{ $t('checkout.companyLabel') }}
                        .i-form-input
                          input(
                            type="text"
                            name="company" 
                            v-model="company"
                            :placeholder="$t('checkout.companyPlaceholder')"
                          )
                      .line
                        label {{ $t('checkout.companyRegLabel') }}
                        .i-form-input
                          input(
                            type="text"
                            name="company_rn" 
                            v-model="company_rn"
                            :placeholder="$t('checkout.companyRegPlaceholder')"
                          )
                      .line
                        label {{ $t('checkout.taxpayLabel') }}
                        .i-form-input
                          input(
                            type="text"
                            name="taxnum" 
                            v-model="taxnum"
                            :placeholder="$t('checkout.taxpayPlaceholder')"
                          )
                      .line
                        label {{ $t('checkout.juridicalAddressLabel') }}
                        .i-form-input
                          input(
                            type="text"
                            name="jur_addr" 
                            v-model="jur_addr"
                            :placeholder="$t('checkout.juridicalAddressPlaceholder')"
                          )
                      .line
                        label {{ $t('checkout.facticalAddressLabel') }}
                        .i-form-input
                          input(
                            type="text"
                            name="fac_addr" 
                            v-model="fac_addr"
                            :placeholder="$t('checkout.facticalAddressPlaceholder')"
                          )
                    ValidationProvider(
                      rules="min:5"
                      name="address line 1"
                      v-slot="{ errors, passed, invalid }"
                    )
                      .line(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        label {{ $t('checkout.addressLineOneLabel') }}
                        .i-form-input(
                          :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                        )
                          input(
                            type="text"
                            name="address_line_1"
                            v-model="address_line_1"
                            :placeholder="$t('checkout.addressLineOnePlaceholder')"
                          )
                          span.i-form-error-message {{ errors[0] }}
                    .line
                      label {{ $t('checkout.addressLineTwoLabel') }}
                      .i-form-input
                        input(
                          type="text"
                          name="address_line_2"
                          v-model="address_line_2" 
                          :placeholder="$t('checkout.addressLineTwoPlaceholder')"
                        )
                    ValidationProvider(
                      rules="min:4"
                      name="city"
                      v-slot="{ errors, passed, invalid }"
                    )
                      .line(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        label {{ $t('checkout.cityLabel') }}
                        .i-form-input(
                          :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                        )
                          input(
                            type="text" 
                            :placeholder="$t('checkout.cityPlaceholder')"
                            name="city"
                            v-model="city"
                          )
                          span.i-form-error-message {{ errors[0] }}
                    .line.is-valid
                        label {{ $t('checkout.countryLabel') }}

                        .i-form-input
                          select(
                            name="country"
                            v-model="country"
                          )
                            option(value="lv") {{ $t('checkout.countryLabel_lv') }}
                            option(value="lt") {{ $t('checkout.countryLabel_lt') }}
                            option(value="ee") {{ $t('checkout.countryLabel_ee') }}
                    ValidationProvider(
                      rules="min:5"
                      name="Post code"
                      v-slot="{ errors, passed, invalid }"
                    )
                      .line(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        label {{ $t('checkout.postCodeLabel') }}
                        .i-form-input(
                          :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                        )
                          input(
                            type="text" 
                            :placeholder="$t('checkout.postCodePlaceholder')"
                            name="postcode"
                            v-model="postcode"
                          )
                          span.i-form-error-message {{ errors[0] }}

                    ValidationProvider(
                      rules="min:5"
                      name="phone"
                      v-slot="{ errors, passed, invalid }"
                    )
                      .line(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        label {{ $t('checkout.phoneLabel') }}
                        .i-form-input(
                          :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                        )
                          input(
                            type="text" 
                            :placeholder="$t('checkout.phonePlaceholder')"
                            name="phone"
                            v-model="phone"
                          )
                          span.i-form-error-message {{ errors[0] }}
                .controls
                  app-back(@back="goBack")
                  template(v-if="!pass")
                    button(type="submit" :disabled="!passed").ui-button.ui-button--big.ui-button--full-green {{ $t('checkout.continueToShipping') }}
                  template(v-else)
                    button(type="submit").ui-button.ui-button--big.ui-button--full-green {{ $t('checkout.continueToShipping') }}
        transition(name="fade-small" mode="out-in")
          div(v-if="form.step === 2")
            .box.entered-info
              .box-record(v-for="item, key in records")
                  .title {{ item.title }}
                  .value {{ item.value }}
                  span.change(@click.prevent="form.step = item.step ") {{ $t('checkout.changeData') }}
            .shipping-method  
              h2 {{ $t('checkout.shippingMethod') }}
              .box
                label.box-record(
                  v-for="method, key in form.methods" 
                  :key="key" 
                  :class="{ active: method.id === form.payment }"
                )
                  .ui-checkbox
                    input( type="radio" name="payment-type" :value="method.id" v-model="form.payment")
                    .ui-checkbox-preview
                  .label-text
                    .title {{ method.title }}
                    .caption(
                        v-if="method.caption"
                        v-html="method.caption"
                    )
                  .price(v-if="method.price !== 0") € {{ method.price }}.00 EUR
                  .price(v-else) {{ $t('checkout.free') }}
              .controls
                app-back(@back="goBack")
                button(@click="sendForm").ui-button.ui-button--big.ui-button--full-green {{ $t('checkout.continueToPayment') }}
        transition(name="fade-small" mode="out-in")
          div(v-if="form.step === 3")
            .box.entered-info
              .box-record(v-for="item, key in records")
                  .title {{ item.title }}
                  .value {{ item.value }}
                  span.change(@click.prevent="form.step = item.step ") {{ $t('checkout.changeData') }}
            form.i-form(
              v-on:submit.prevent="sendForm"
            )
              .card
                h2 {{ $t('checkout.paymentTitle') }}
                h3 {{ $t('checkout.paymentCaption') }}
                .box
                    label.box-record
                        .ui-checkbox
                            input( type="radio" name="payment-type" value="card" v-model="form.paymentType")
                            .ui-checkbox-preview
                        .label-text {{ $t('checkout.paymentTypeCard') }}
                label.rules
                    .ui-checkbox
                        input( type="checkbox" v-model="accept" required name="rules")
                        .ui-checkbox-preview
                    .text 
                        | {{ $t('checkout.ruleLinkStart') }} 
                        a(href="https://www.inbalans.lv/static/Distances-ligums" target="_blank") {{ $t('checkout.ruleLinkLink1') }} {{ $t('checkout.ruleLinkDelimeter') }} {{ $t('checkout.ruleLinkLink2') }}
              .controls
                app-back(@back="goBack")
                button(type="submit").ui-button.ui-button--big.ui-button--full-green {{ $t('checkout.continueToPayment') }}
        transition(name="fade-small" mode="out-in")        
          div(v-if="form.step === 4")
            h2 {{ $t('checkout.redirect') }}
</template>

<script>
import appCheckoutHistory from "@/components/client/Checkout/History";
import appOrderPreview from "@/components/client/Checkout/OrderPreview";
import appShippingAddress from "@/components/client/Checkout/ShippingAddress";
import appCustomerInformation from "@/components/client/Checkout/CustomerInformation";
import appBack from "@/components/client/BackCheckout";
import { mapMutations, mapGetters } from "vuex";

export default {
  layout: "checkout",
  name: "checkout",
  data() {
    return {
      shippingPrice: null,
      first_name: "", // +
      last_name: "", // +
      company: "",
      company_rn: "",
      taxnum: "",
      jur_addr: "",
      fac_addr: "",
      email: "", // +
      address_line_1: "",
      address_line_2: "",
      city: "",
      country: "lv",
      postcode: "",
      phone: "",
      accept: false,
      pass: false,
      products: [],
      code: "",
      form: {
        step: 0,
        payment: "free",
        paymentType: "card",
        status: "phiz",
        methods: [
          {
            id: "free",
            title: "Free - Avotu iela 5, Rīga, LV-1011",
            caption: null,
            price: 0
          },
          {
            id: "omnivia",
            title: "Omniva",
            caption:
              "до 49,99 евро – 3 евро,<br/> свыше 50,00 евро – бесплатно",
            price: 3
          },
          {
            id: "omnivia_courier",
            title: "Omniva courier",
            caption: "3 business days",
            price: 5
          }
        ]
      }
    };
  },
  methods: {
    sendForm() {
      this.pass = true;
      this.form.step++;
      this.$refs.cont.scrollIntoView();

      if (this.form.step === 4) {
        this.save();
      }
    },
    async save() {
      const response = await this.$api(
        "post",
        "contacts/checkout",
        Object.assign(
          this.$data,
          { products: this.getProductsIds },
          { coupon: this.coupon }
        )
      );

      window.location.href = response;
    },
    goBack() {
      if (this.form.step === 1) {
        return this.$router.go(-1);
      }

      this.$refs.cont.scrollIntoView();
      return --this.form.step;
    },
    ...mapMutations({
      clear: "cart/clearCoupon"
    })
  },
  components: {
    appCheckoutHistory,
    appOrderPreview,
    appShippingAddress,
    appCustomerInformation,
    appBack
  },
  computed: {
    records() {
      const rec = [];

      if (this.email) {
        rec.push({
          title: this.$t("checkout.contact"),
          value: this.email,
          step: 1
        });
      }

      if (this.address_line_1 && this.city && this.country) {
        const addrStr = [
          this.address_line_1,
          this.address_line_2,
          this.city,
          this.country
        ].join(", ");

        rec.push({
          title: this.$t("checkout.shipTo"),
          value: addrStr,
          step: 1
        });
      }

      if (this.form.step === 3) {
        const shipMet = this.form.methods.find(obj => {
          return obj.id === this.form.payment;
        });

        this.shippingPrice = shipMet.price;

        rec.push({
          title: this.$t("checkout.method"),
          value: shipMet.title,
          step: 2
        });
      }

      return rec;
    },
    steps() {
      return this.form.step + 1;
    },
    ...mapGetters("cart", ["coupon", "getProductsIds", "totalCountRaw"])
  },
  mounted() {
    this.form.step = 1; // just for transition
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
  }
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
  flex-direction: column-reverse;

  .ui-button {
    margin-bottom: 20px;

    @media #{$media_md} {
      margin-bottom: 0;
    }
  }

  @media #{$media_md} {
    flex-direction: row;
  }
}

.shipping {
  margin-bottom: 50px;

  h2 {
    font-family: Lora;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    margin: 0;
    margin-bottom: 8px;

    @media #{$media_md} {
      margin-bottom: 30px;
    }
    /* identical to box height */

    color: #000000;
  }
  .box {
    border: 1px solid #e5e5e5;

    &-record {
      padding: 30px;
      display: grid;
      grid-template-columns: 1fr;
      border-bottom: 1px solid #e5e5e5;
      align-items: center;

      &:last-child {
        border-bottom: 0;
      }

      @media #{$media_md} {
        grid-template-columns: 1fr 4fr 1fr;
      }
    }
  }

  label {
    cursor: pointer;
  }

  .rules {
    display: flex;
    padding: 30px 0;
    padding-bottom: 0;

    .text {
      font-family: Lora;
      font-style: italic;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;

      color: #000000;
      margin-left: 8px;

      a {
        font-weight: bold;
        text-decoration: none;
        color: #000000;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.shipping-addr {
  h2 {
    font-family: Lora;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    margin: 0;
    margin-bottom: 8px;
    margin-bottom: 30px;

    color: #000000;
  }

  .box {
    border: 1px solid #e5e5e5;

    &-record {
      padding: 30px;
      display: grid;
      grid-template-columns: 1fr 4fr 1fr;
      border-bottom: 1px solid #e5e5e5;
      align-items: center;

      &:last-child {
        border-bottom: 0;
      }
    }
  }
}

.shipping-method {
  h2 {
    font-family: Lora;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    margin: 0;
    margin-bottom: 8px;
    margin-bottom: 30px;
    /* identical to box height */

    color: #000000;
  }

  label {
    cursor: pointer;
  }

  .box {
    border: 1px solid #e5e5e5;

    &-record {
      padding: 30px;
      display: grid;
      grid-template-columns: 1fr;
      border-bottom: 1px solid #e5e5e5;
      align-items: center;
      gap: 10px;

      &:last-child {
        border-bottom: 0;
      }

      @media #{$media_md} {
        grid-template-columns: 1fr 4fr 1fr;
        gap: 0;
      }

      .price {
        text-align: left;

        @media #{$media_md} {
          text-align: right;
        }
      }

      &.active {
        .title {
          font-weight: bold;
        }
      }
    }
  }

  .price {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    /* identical to box height, or 114% */

    text-align: right;

    /* Black */

    color: #000000;
    opacity: 0.5;
  }
  .title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    /* identical to box height, or 114% */

    /* Black */

    color: #000000;
  }

  .caption {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    margin-top: 5px;
    /* identical to box height, or 133% */

    /* Black */

    color: #000000;
  }
}

.entered-info {
  margin-bottom: 50px;

  &.box {
    border: 1px solid #e5e5e5;

    .box-record {
      padding: 30px;
      display: grid;
      grid-template-columns: 1fr;
      border-bottom: 1px solid #e5e5e5;
      align-items: center;
      gap: 10px;

      &:last-child {
        border-bottom: 0;
      }

      @media #{$media_md} {
        grid-template-columns: 110px 4fr 1fr;
        gap: 0;
      }

      .change {
        text-align: left;

        @media #{$media_md} {
          text-align: right;
        }
      }
    }
  }
  .title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 1.33em;
    color: #acb5bd;
    mix-blend-mode: normal;
  }

  .value {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.3em;
    /* identical to box height, or 114% */

    /* Black */

    color: #000000;
  }

  .change {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    /* identical to box height, or 114% */
    text-align: right;
    color: #000000;
    opacity: 0.5;
    text-decoration: none;
    cursor: pointer;
  }
}
.card {
  display: block;
  .box {
    border: 1px solid #e5e5e5;

    &-record {
      padding: 30px;
      display: grid;
      grid-template-columns: 1fr 4fr 1fr;
      border-bottom: 1px solid #e5e5e5;
      align-items: center;

      &:last-child {
        border-bottom: 0;
      }
    }
  }

  h2 {
    font-family: Lora;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    margin: 0;
    margin-bottom: 8px;
    /* identical to box height */

    color: #000000;
  }

  h3 {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    margin-top: 0;
    /* identical to box height, or 133% */

    /* Black */

    color: #000000;
  }

  .box {
    margin-top: 35px;
    border: 1px solid #e5e5e5;
  }

  .label-text {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 1.3em;
    color: #000000;
  }

  label {
    cursor: pointer;
  }

  .rules {
    display: flex;
    padding: 30px 0;

    .text {
      font-family: Lora;
      font-style: italic;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      /* identical to box height, or 117% */

      color: #000000;
      margin-left: 8px;

      a {
        font-weight: bold;
        text-decoration: none;
        color: #000000;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .slide-content {
    padding: 30px;
    border-bottom: 1px solid #e5e5e5;

    &.no-border {
      border-bottom: none;
    }
  }
}

.status-select {
  display: flex;

  .label-text {
    margin-left: 10px;
  }
}

.identity {
  & > div {
    display: flex;
    justify-content: space-around;
    padding-bottom: 10px;
  }
}

.back {
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: #7e8f97;
  font-family: "Lora", sans-serif;
  display: flex;
  padding-top: 5px;
  padding-bottom: 20px;
  transition: opacity 0.3s ease;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }

  img {
    margin-right: 17px;
  }
}
</style>
