<template lang="pug">
    .shipping  
        h2 Shipping Method
        .box
            label.box-record(
                v-for="method, key in methods" 
                :key="key" 
                :class="{ active: method.id === payment }"
            )
                .ui-checkbox
                    input( type="radio" name="payment-type" :value="method.id" v-model="payment")
                    .ui-checkbox-preview
                .label-text
                    .title {{ method.title }}
                    .caption(
                        v-if="method.caption"
                    ) {{ method.caption }}
                .price(v-if="method.price !== 0") € {{ method.price }}.00 EUR
                .price(v-else) FREE
</template>

<script>
export default {
  data() {
    return {
      payment: "free",
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
    };
  }
};
</script>

<style lang="scss" scoped>
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
    grid-template-columns: 1fr 4fr 1fr;
    border-bottom: 1px solid #e5e5e5;
    align-items: center;

    &:last-child {
      border-bottom: 0;
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
</style>
