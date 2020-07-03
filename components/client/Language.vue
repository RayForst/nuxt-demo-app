<template lang="pug">
  .language
    .lang-xs
      vue-dropdown(
        :config="configShort"
        @setSelectedOption="setNewSelectedOption($event);"
        @onToggle="fireLangToggle"
      )
    .lang-md
      vue-dropdown(
        :config="config"
        @setSelectedOption="setNewSelectedOption($event);"
      )
</template>

<script>
import vueDropdown from "@/components/client/dropdown/vue-dropdown";
import moment from "moment";

export default {
  name: "App",
  components: {
    vueDropdown
  },
  data: function() {
    return {
      loaded: false,
      config: {
        options: [
          {
            value: "Latviski",
            locale: "lv"
          },
          {
            value: "ПО-РУССКИ",
            locale: "ru"
          },
          {
            value: "ENGLISH",
            locale: "en"
          }
        ],
        prefix: "",
        placeholder: "ENGLISH",
        backgroundColor: "#fff",
        hoverBackgroundColor: "#e9ebec",
        textColor: "black",
        borderRadius: "0",
        border: "none",
        width: 96
      },
      configShort: {
        options: [
          {
            value: "LV",
            locale: "lv"
          },
          {
            value: "РУ",
            locale: "ru"
          },
          {
            value: "EN",
            locale: "en"
          }
        ],
        prefix: "",
        placeholder: "РУ",
        backgroundColor: "#fff",
        hoverBackgroundColor: "#e9ebec",
        textColor: "black",
        borderRadius: "0",
        border: "none",
        width: 45
      }
    };
  },
  methods: {
    fireLangToggle() {
      this.$nuxt.$emit("langToggle", true);
    },
    setNewSelectedOption(selectedOption) {
      const option = this.findOption(
        this.config.options,
        selectedOption.locale
      );

      const optionShort = this.findOption(
        this.configShort.options,
        selectedOption.locale
      );

      this.config.placeholder = option.value;
      this.configShort.placeholder = optionShort.value;

      this.$router.push(this.switchLocalePath(option.locale));
    },
    setShortNewSelectedOption(selectedOption) {
      const option = this.findOption(
        this.configShort.options,
        selectedOption.value
      );

      this.configShort.placeholder = option.value;

      this.$router.push(this.switchLocalePath(option.locale));
    },
    findOption(array, find) {
      return array.find(obj => {
        return obj.locale === find;
      });
    },
    findOptionByLocale(array, find) {
      return array.find(obj => {
        return obj.locale === find;
      });
    }
  },
  mounted() {
    const selectedLang = this.findOptionByLocale(
      this.config.options,
      this.$i18n.locale
    );
    const selectedLangShort = this.findOptionByLocale(
      this.configShort.options,
      this.$i18n.locale
    );

    this.config.placeholder = selectedLang.value;
    this.configShort.placeholder = selectedLangShort.value;
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.lang-xs {
  display: inline-flex;

  @media #{$media_md} {
    display: none;
  }
}

.lang-md {
  display: none;

  @media #{$media_md} {
    display: inline-flex;
  }
}
</style>
