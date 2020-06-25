<template lang="pug">
  .social-buttons
    a.social(
      v-for="link in links" 
      :href="link.link"
      target="_blank"
      :title="link.title"
      :class="{ gray: colorClass === 'gray' }"
    )
      img(:src="'/icons/'+link.icon" alt="")
</template>

<script>
export default {
  props: ["colorClass"],
  data() {
    return {
      links: [
        {
          title: "Facebook",
          icon: "fb-grey.svg",
          link: this.$store.state.settings.settings.facebook
        },
        {
          title: "Instagram",
          icon: "insta-grey.svg",
          link: this.$store.state.settings.settings.instagram
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
a {
  width: 40px;
  height: 40px;
  background-color: #103324;
  display: inline-flex;
  color: #fff;
  text-indent: -9999px;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;

  &.gray {
    background-color: #4a4a4a;
  }

  & + a {
    margin-left: 10px;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
