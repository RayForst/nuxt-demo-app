<template lang="pug">
    .box.entered-info
        .box-record(v-for="item, key in records")
            .title {{ item.title }}
            .value {{ item.value }}
            a.change(href="#") CHANGE
</template>

<script>
export default {
  props: ["records"]
};
</script>

<style lang="scss" scoped>
.entered-info {
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
  }
}
</style>
