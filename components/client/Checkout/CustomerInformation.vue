<template lang="pug">
    .shipping  
        h2 Customer information
        .ui-box-form.shipping-address_form.form-box
          .line
              label Your Email
              slot
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
  name: "checkout-customer-information",
  data() {
    return {
      email: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.shipping {
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
</style>
