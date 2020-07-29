<template lang="pug">
  .container-fluid
    .row.center-xs
      .col-xs-12.center-xs.start-md
        .error-page
          h1.code(v-if="error.statusCode === 404") {{ title }}
          h1(v-else) An error occurred
          .message(v-html='message')
          div.back
            a.ui-btn.ui-secondary(
              @click="$router.go(-1)"
              v-if="canGoBack"
            ) Go back

            nuxt-link.ui-btn.ui-secondary.ui-button.ui-button--full-green(
              :to="localePath('/')"
              v-else
            ) Go home
</template>

<script>
export default {
  props: ["error"],
  metaInfo: {
    title: "404 Error"
  },
  data() {
    return {
      title: "404",
      message: "Oops, the page you're<br> looking for dos not exist."
    };
  },
  computed: {
    canGoBack() {
      if (!process.browser) return false;

      return window.history.length > 3;
    }
  }
};
</script>
<style lang="scss" scoped>
.code {
  font-size: 84px;
  color: #4a4a4a;
  margin-bottom: 10px;
  margin-top: 0px;
}

a {
  color: #4a4a4a;
}
.back {
  margin-bottom: 40px;
}

.error-page {
  padding: 50px;
  text-align: center;
}

.message {
  color: #767676;
  font-size: 22px;
  margin-bottom: 30px;
}

h1 {
  max-width: none;
}
</style>
