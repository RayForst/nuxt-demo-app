<template>
  <div class="container">
    <div>
      <logo />
      <h1>Current locale - {{ $i18n.locale }}</h1>
      <LanguageChange></LanguageChange>
      <nav>
        <nuxt-link :to="localePath('/contacts')">{{ $t("welcome") }}</nuxt-link>
      </nav>
    </div>
  </div>
</template>

<script>
import LanguageChange from "~/components/LanguageChange.vue";
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo,
    LanguageChange
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
