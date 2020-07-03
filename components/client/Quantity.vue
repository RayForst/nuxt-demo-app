<template lang="pug">
.quantity-control
    span.dec(@click="dec")
    input(type="text" v-model="qnt") 
    span.inc(@click="inc")
</template>

<script>
export default {
  props: ["defaultValue"],
  data() {
    return {
      qnt: "1 gab."
    };
  },
  methods: {
    inc() {
      console.log("increase");
      let qnt = this.quantity + 1;
      this.qnt = `${qnt + 1} gab.`;

      this.$emit("quantityChange", qnt);
    },
    dec() {
      if (this.quantity > 1) {
        let qnt = this.quantity - 1;

        this.qnt = `${qnt} gab.`;

        this.$emit("quantityChange", qnt);
      }
    }
  },
  computed: {
    quantity() {
      let regex = /\d+/g;
      let matches = this.qnt.match(regex);
      let quantity = Math.abs(matches.join(""));

      console.log("quantity", quantity > 1 ? quantity : 1);
      return quantity > 1 ? quantity : 1;
    }
  },
  mounted() {
    this.qnt = `${this.$props.defaultValue} gab.`;
  }
};
</script>

<style lang="scss" scoped>
.quantity-control {
  display: flex;
  align-items: center;

  .dec,
  .inc {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 1.5em;
    text-align: center;
    letter-spacing: 0.857143px;
    text-transform: uppercase;
    color: #103324;
    border: 1px solid #103324;
    display: inline-flex;
    height: 20px;
    width: 20px;
    position: relative;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      height: 1px;
      background: #103324;
    }

    &:hover {
      background: #103324;

      &::before,
      &::after {
        background: #fff;
      }
    }

    &:active {
      transform: translate(1px, 1px);
    }
  }

  .dec {
  }
  .inc {
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(90deg);
      width: 50%;
      height: 1px;
      background: #103324;
    }
  }

  input {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    width: 100px;
    text-align: center;
    color: #000000;
    padding: 10px 20px;
    margin: 0 10px;
  }
}
</style>
