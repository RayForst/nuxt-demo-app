<template lang="pug">
    .shipping-addr 
        h2 Shipping Address
        .ui-box-form.shipping-address_form.form-box
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
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
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
</style>
