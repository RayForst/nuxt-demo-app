<template lang="pug">
div 
</template>

<script>
export default {
  mounted() {
    this.$router.push(this.localePath("/products/skin-regimen"));
  },
  head() {
    return {
      title: "Loading..."
    };
  }
};
</script>
0
