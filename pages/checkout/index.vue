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
        template(v-if="form.step === 1")
          ValidationObserver(
            v-slot="{ passed }"
          )
            form.i-form(
              autocomplete="off"
              v-on:submit.prevent="sendForm"
            )
              .shipping  
                h2 Customer information

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
                      label Your Email
                      .i-form-input(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        input(
                          type="text" 
                          name="test" 
                          v-model="email" 
                          required 
                          placeholder="Your Email"
                        )
                        span.i-form-error-message {{ errors[0] }}
                    .line.identity
                      label Your identity
                      div
                        label.status-select
                          .ui-checkbox
                            input( type="radio" name="payment-type" value="phiz" v-model="form.status")
                            .ui-checkbox-preview
                          .label-text Physical person
                        label.status-select
                          .ui-checkbox
                            input( type="radio" name="payment-type" value="jur" v-model="form.status")
                            .ui-checkbox-preview
                          .label-text Juridical person
                label.rules
                    .ui-checkbox
                        input(type="checkbox" v-model="accept" required name="rules")
                        .ui-checkbox-preview
                    .text 
                        | Iepazinos un piekritu 
                        a(href="#") noteikumiem 
                        | un 
                        a(href="#") privatuma politikai

              .shipping-addr 
                h2 Shipping Address

                .ui-box-form.shipping-address_form.form-box
                  ValidationProvider(
                    rules="alpha"
                    name="First name"
                    v-slot="{ errors, passed, invalid }"
                  )
                    .line(
                      :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                    )
                      label First name
                      .i-form-input(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        input(
                          type="text"
                          v-model="first_name" 
                          name="first_name" 
                          required 
                          placeholder="First name"
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
                      label Last name
                      .i-form-input(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        input(
                          type="text"
                          v-model="last_name" 
                          name="last_name"  
                          required 
                          placeholder="Last name"
                        )
                        span.i-form-error-message {{ errors[0] }}
                  
                  template(v-if="form.status == 'jur'")
                    .line
                      label Company
                      .i-form-input
                        input(
                          type="text"
                          name="company" 
                          v-model="company"
                          placeholder="Company (optional)"
                        )
                    .line
                      label Company registration number
                      .i-form-input
                        input(
                          type="text"
                          name="company_rn" 
                          v-model="company_rn"
                          placeholder="Company registration numer (optional)"
                        )
                    .line
                      label Taxpay number
                      .i-form-input
                        input(
                          type="text"
                          name="taxnum" 
                          v-model="taxnum"
                          placeholder="Taxpay number (optional)"
                        )
                    .line
                      label Juridical address
                      .i-form-input
                        input(
                          type="text"
                          name="jur_addr" 
                          v-model="jur_addr"
                          placeholder="Juridical address (optional)"
                        )
                    .line
                      label Factical address
                      .i-form-input
                        input(
                          type="text"
                          name="fac_addr" 
                          v-model="fac_addr"
                          placeholder="Factical address (optional)"
                        )
                  ValidationProvider(
                    rules="min:5"
                    name="address line 1"
                    v-slot="{ errors, passed, invalid }"
                  )
                    .line(
                      :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                    )
                      label Address line 1
                      .i-form-input(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        input(
                          type="text"
                          name="address_line_1"
                          v-model="address_line_1"
                          placeholder="Address line 1"
                        )
                        span.i-form-error-message {{ errors[0] }}
                  .line
                    label Address line 2
                    .i-form-input
                      input(
                        type="text"
                        name="address_line_2"
                        v-model="address_line_2" 
                        placeholder="Address line 2 (optional)"
                      )
                  ValidationProvider(
                    rules="min:4"
                    name="city"
                    v-slot="{ errors, passed, invalid }"
                  )
                    .line(
                      :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                    )
                      label City
                      .i-form-input(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        input(
                          type="text" 
                          placeholder="City"
                          name="city"
                          v-model="city"
                        )
                        span.i-form-error-message {{ errors[0] }}
                  .line.is-valid
                      label Country

                      .i-form-input
                        select(
                          name="country"
                          v-model="country"
                        )
                          option(value="Latvia") Latvia
                  ValidationProvider(
                    rules="min:5"
                    name="Post code"
                    v-slot="{ errors, passed, invalid }"
                  )
                    .line(
                      :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                    )
                      label Post code
                      .i-form-input(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        input(
                          type="text" 
                          placeholder="Post code * with spacing"
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
                      label Phone
                      .i-form-input(
                        :class="{ 'is-valid': passed, 'is-invalid': invalid }"
                      )
                        input(
                          type="text" 
                          placeholder="Phone"
                          name="phone"
                          v-model="phone"
                        )
                        span.i-form-error-message {{ errors[0] }}
              .controls
                app-back(@back="goBack")
                template(v-if="!pass")
                  button(type="submit" :disabled="!passed").ui-button.ui-button--big.ui-button--full-green Continue to shipping
                template(v-else)
                  button(type="submit").ui-button.ui-button--big.ui-button--full-green Continue to shipping
        template(v-if="form.step === 2")
          .box.entered-info
            .box-record(v-for="item, key in records")
                .title {{ item.title }}
                .value {{ item.value }}
                span.change(@click.prevent="form.step = item.step ") CHANGE
          .shipping-method  
            h2 Shipping Method
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
                  ) {{ method.caption }}
                .price(v-if="method.price !== 0") € {{ method.price }}.00 EUR
                .price(v-else) FREE
            .controls
              app-back(@back="goBack")
              button(@click="sendForm").ui-button.ui-button--big.ui-button--full-green Continue to shipping
        template(v-if="form.step === 3")
          .box.entered-info
            .box-record(v-for="item, key in records")
                .title {{ item.title }}
                .value {{ item.value }}
                span.change(@click.prevent="form.step = item.step ") CHANGE
          form.i-form(
            v-on:submit.prevent="sendForm"
          )
            .card
              h2 Payment
              h3 All transactions are secure and encrypted
              .box
                  label.box-record
                      .ui-checkbox
                          input( type="radio" name="payment-type" value="card" v-model="form.paymentType")
                          .ui-checkbox-preview
                      .label-text Credit Card
                  slide-up-down(
                      :active="form.paymentType === 'card'"
                      :duration="200"
                  )
                      .slide-content
                          p You will be redirected to bank page

                  label.box-record
                      .ui-checkbox
                          input(type="radio" name="payment-type" value="paypal" v-model="form.paymentType")
                          .ui-checkbox-preview
                      .label-text
                          img(v-lazy-load data-src="/icons/paypal.svg")
                  slide-up-down(
                      :active="form.paymentType === 'paypal'"
                      :duration="200"
                  )   
                      .slide-content.no-border
                          p You will be redirected to paypal
              label.rules
                  .ui-checkbox
                      input( type="checkbox" required name="rules")
                      .ui-checkbox-preview
                  .text 
                      | Iepazinos un piekritu 
                      a(href="#") noteikumiem 
                      | un 
                      a(href="#") privatuma politikai
            .controls
              app-back(@back="goBack")
              button(type="submit").ui-button.ui-button--big.ui-button--full-green Continue to Payment
        template(v-if="form.step === 4")
          h2 Redirecting to payment
</template>

<script>
import appCheckoutHistory from "@/components/client/Checkout/History";
import appOrderPreview from "@/components/client/Checkout/OrderPreview2";
import appShippingAddress from "@/components/client/Checkout/ShippingAddress";
import appCustomerInformation from "@/components/client/Checkout/CustomerInformation";
import appBack from "@/components/client/BackCheckout";

export default {
  layout: "checkout",
  data() {
    return {
      shippingPrice: null,
      first_name: "",
      last_name: "",
      company: "",
      company_rn: "",
      taxnum: "",
      jur_addr: "",
      fac_addr: "",
      email: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      country: "Latvia",
      postcode: "",
      phone: "",
      accept: false,
      pass: false,
      form: {
        step: 1,
        payment: "free",
        paymentType: "card",
        status: "phiz",
        methods: [
          {
            id: "free",
            title: "Free shipping",
            caption: null,
            price: 0
          },
          {
            id: "upsp",
            title: "USPS Priority Mail",
            caption: "3 business days",
            price: 5
          },
          {
            id: "upsp2",
            title: "USPS Priority Mail",
            caption: "3 business days",
            price: 5
          },
          {
            id: "upsp3",
            title: "USPS Priority Mail",
            caption: "3 business days",
            price: 5
          },
          {
            id: "upsp4",
            title: "USPS Priority Mail",
            caption: "3 business days",
            price: 5
          },
          {
            id: "upsp5",
            title: "USPS Priority Mail",
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
        this.$router.push(this.localePath(`/checkout/success`));
      }
    },
    goBack() {
      if (this.form.step === 1) {
        return this.$router.go(-1);
      }

      this.$refs.cont.scrollIntoView();

      return --this.form.step;
    }
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
        rec.push({ title: "Contact", value: this.email, step: 1 });
      }

      if (this.address_line_1 && this.city && this.country) {
        const addrStr = [
          this.address_line_1,
          this.address_line_2,
          this.city,
          this.country
        ].join(", ");

        rec.push({ title: "Ship to", value: addrStr, step: 1 });
      }

      if (this.form.step === 3) {
        const shipMet = this.form.methods.find(obj => {
          return obj.id === this.form.payment;
        });

        this.shippingPrice = shipMet.price;
        rec.push({
          title: "method",
          value: shipMet.title,
          step: 2
        });
      }

      return rec;
    },
    steps() {
      return this.form.step + 1;
    }
  },
  mounted() {
    const that = this;

    // if (this.$store.state)

    // setTimeout(function() {
    //   console.log("FIRE");
    //   that.sendForm();
    // }, 2000);
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
    /* identical to box height */

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
        grid-template-columns: 1fr 4fr 1fr;
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
