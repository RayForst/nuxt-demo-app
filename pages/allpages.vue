<template lang="pug">
    .container
        app-demo-form
        br
        br
        br
        .page-container.your-cart
            h2 Your Cart
            .your-cart_items
                .item
                    span 
                    span 
                    span Price
                    span quantity
                    span total
                .item(v-for="item, i in cartItems" :key="i")
                    img(:src="item.img")
                    span.details 
                        span.title {{ item.title }}
                        span.caption {{ item.caption }}
                    span.price {{ item.price }}
                    span.qnt {{ item.qnt }}
                    span.total {{ total(item.price, item.qnt) }}
            .your-cart_total
                .count
                    span subtotal
                    span € 386.45 EUR
                .caption Shipping and taxes calculated at checkout
                button Buy Now

        .page-container.checkout-info.split-2
            .split
                .split-2.split-2_center
                    h2 Customer information
                    span.haveaccount 
                        | Already have an account? 
                        a(href="#") Log in
                .customer-info.form-box
                    .line
                        label Your Email
                        input(type="email" placeholder="Enter your email")
                label
                    input(type="checkbox")
                    span.text Keep me up to date on news and exclusive offers

                .shipping-address
                    h2 Shipping Address
                    .shipping-address_form.form-box
                        .line
                            label First name
                            input(type="text" required placeholder="First name")
                        .line
                            label Last name
                            input(type="text" required placeholder="Last name")
                        .line
                            label Company
                            input(type="text" placeholder="Company (optional)")
                        .line
                            label Address line 1
                            input(type="text" placeholder="Address line 1")
                        .line
                            label Address line 2
                            input(type="text" placeholder="Address line 2")
                        .line
                            label City
                            input(type="text" placeholder="City")
                        .line
                            label Country
                            select
                                option Latvia
                        .line
                            label Post code
                            input(type="text" placeholder="Post code * with spacing")
                        .line
                            label Phone
                            input(type="text" placeholder="Phone")

            .split.bg
                h2 Your Order
                .your-cart_items.your-cart_items-small
                    .item(v-for="item, i in cartItems" :key="i")
                        img(:src="item.img")
                        span.title {{ item.title }}
                        span.total {{ total(item.price, item.qnt) }}
                form.coupon
                    input(type="text" placeholder="Discount code")
                    button Apply
                .checkout-math
                    .line.split-2
                        span subtotal
                        span € 122.45 EUR
                    .line.split-2
                        span Shipping
                        span Calculated at next step
                    .line.split-2.total
                        span total
                        span € 122.45 EUR


        .page-container.checkout-shipping.split-2
            .split
               
                .customer-info.form-box
                    .line
                        label Your Email
                        input(type="email" placeholder="Enter your email")
                h2 Shipping Method
                .form-box.shipping-select
                    .line(v-for="method, i in shippingMethods" :key="i")
                        input(
                            type="checkbox"
                        )
                        span.details
                            span.title {{ method.title }}
                            span.long {{ method.long }}
                        span.price

            .split.bg
                h2 Your Order
                .your-cart_items.your-cart_items-small
                    .item(v-for="item, i in cartItems" :key="i")
                        img(:src="item.img")
                        span.title {{ item.title }}
                        span.total {{ total(item.price, item.qnt) }}
                form.coupon
                    input(type="text" placeholder="Discount code")
                    button Apply
                .checkout-math
                    .line.split-2
                        span subtotal
                        span € 122.45 EUR
                    .line.split-2
                        span Shipping
                        span Calculated at next step
                    .line.split-2.total
                        span total
                        span € 122.45 EUR        
        .page-container.checkout-payment.split-2
            .split
                h2 Customer information
            .split.bg
                h2 Your Order
                .your-cart_items.your-cart_items-small
                    .item(v-for="item, i in cartItems" :key="i")
                        img(:src="item.img")
                        span.title {{ item.title }}
                        span.total {{ total(item.price, item.qnt) }}
                form.coupon
                    input(type="text" placeholder="Discount code")
                    button Apply
                .checkout-math
                    .line.split-2
                        span subtotal
                        span € 122.45 EUR
                    .line.split-2
                        span Shipping
                        span Calculated at next step
                    .line.split-2.total
                        span total
                        span € 122.45 EUR        

</template>

<script>
import appDemoForm from "@/components/client/ExampleForm";

export default {
  data() {
    return {
      cartItems: [
        {
          img: "https://via.placeholder.com/120x120",
          link: "#",
          title: "Aromasoul mediterranean body cream",
          caption: "200 ml - 6.7 fl.oz. US.",
          price: 125.45,
          qnt: 2
        },
        {
          img: "https://via.placeholder.com/120x120",
          link: "#",
          title: "Aromasoul mediterranean body cream",
          caption: "200 ml - 6.7 fl.oz. US.",
          price: 125.45,
          qnt: 2
        }
      ],
      shippingMethods: [
        {
          title: "USPS Priority Mail",
          long: "3 business days",
          price: "€ 10"
        },
        {
          title: "DPD  service",
          long: "3 business days",
          price: "€ 10"
        },
        {
          title: "USPS Priority Mail",
          long: "3 business days",
          price: "€ 10"
        },
        {
          title: "DPD  service",
          long: "3 business days",
          price: "€ 10"
        },
        {
          title: "USPS Priority Mail",
          long: "3 business days",
          price: "€ 10"
        },
        {
          title: "DPD  service",
          long: "3 business days",
          price: "€ 10"
        }
      ]
    };
  },
  methods: {
    total(price, qnt) {
      return 10;
    }
  },
  components: {
    appDemoForm
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  border: 1px solid blueviolet;
  padding: 40px;
}

h2 {
  font-size: 20px;
  line-height: 26px;
  color: #000000;
}

.your-cart {
  &_items {
    .item {
      display: grid;
      grid-template-columns: 120px 2fr 1fr 1fr 1fr;
      border-bottom: 1px solid purple;
      padding: 30px 0;
    }
    .details {
      display: flex;
      flex-direction: column;
      margin-left: 40px;
    }
    &-small {
      .item {
        grid-template-columns: 120px 2fr 1fr;
      }
    }
  }

  &_total {
  }
}

.split-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;

  &_center {
    align-items: center;
  }
}

input {
  color: #000;
  border: none;
  line-height: 20px;
  font-size: 14px;
  padding: 20px;

  &::placeholder {
    color: #acb5bd;
  }
}

.form-box {
  border: 1px solid purple;
  padding: 10px 30px;

  .line {
    display: grid;
    grid-template-columns: 200px 1fr;
    align-items: center;
    border-bottom: 1px solid purple;

    &:last-child {
      border-bottom: none;
    }
  }
  label {
    color: #000;
    font-size: 14px;
  }

  select {
    color: #000;
    cursor: pointer;
    background: #fff;
    border: 2px solid white;
    padding: 19px 20px;
    font-size: 14px;
    line-height: 16px;
  }
}

.bg {
  background: #d870925e;
  margin-left: 45px;
  padding: 40px 68px 90px 68px;
}

.haveaccount {
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  text-align: right;

  a {
    font-weight: bold;
    color: #000000;
  }
}

.your-cart_total {
  text-align: right;
}
</style>
