<template lang="pug">
    .card
        h2 Payment
        h3 All transactions are secure and encrypted
        .box
            label.box-record
                .ui-checkbox
                    input( type="radio" name="payment-type" value="card" v-model="payment")
                    .ui-checkbox-preview
                .label-text Credit Card
            slide-up-down(
                :active="payment === 'card'"
                :duration="200"
            )
                .slide-content
                    p You will be redirected to bank page

            label.box-record
                .ui-checkbox
                    input(type="radio" name="payment-type" value="paypal" v-model="payment")
                    .ui-checkbox-preview
                .label-text
                    img(src="/icons/paypal.svg")
            slide-up-down(
                :active="payment === 'paypal'"
                :duration="200"
            )   
                .slide-content.no-border
                    p You will be redirected to paypal
        label.rules
            .ui-checkbox
                input( type="checkbox" name="rules")
                .ui-checkbox-preview
            .text 
                | Iepazinos un piekritu 
                a(href="#") noteikumiem 
                | un 
                a(href="#") privatuma politikai
</template>
<script>
export default {
  data() {
    return {
      payment: "card"
    };
  }
};
</script>
<style lang="scss" scoped>
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
</style>
