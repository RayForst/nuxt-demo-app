<template lang="pug">
div.static
  section.hero
    div.bg-image.hero-main.bg-hero
  .contact-wrap.content-container.content
    .row
      .col-xs-12.col-lg-6
        .container
          h1 {{ $t('contacts.title') }}
          app-contact-form(
            v-on:contact-form-submit="test"
          )
      .col-xs-12.col-lg-6
        .row.container
          .col-xs-12
            .caption {{ $t('contacts.workTime') }}
          .col-xs-12
            app-short-contacts(:column="true")
          .col-xs-12
            .map-wrapper
              app-map
  app-subscribe
</template>

<script>
import appContactForm from "@/components/client/Forms/Contact";
import appMap from "@/components/client/Map";
import appSubscribe from "@/components/client/Subscribe";
import appShortContacts from "@/components/client/ShortContacts";

export default {
  name: "contacts",
  head() {
    return {
      title: "Contacts"
    };
  },
  components: {
    appContactForm,
    appMap,
    appSubscribe,
    appShortContacts
  },
  data() {
    return {};
  },
  methods: {
    test(items) {
      this.save(items);
    },
    async save(data) {
      try {
        const response = await this.$api("post", "contacts/save", data);

        // $this.success = true;
        // $this.clearForm();
      } catch (err) {
        // if (err.response.status === 422) {
        //   err.response.data.errors.forEach(function(element) {
        //     $this.form[element.param].error = element.msg;
        //   });
        // } else {
        //   console.log("ERRR :", err.response);
        //   if (err.response.data.error === "unique violation") {
        //     this.serverError = this.errors.already_subscribe;
        //   }
        // }
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.bg-hero {
  background-image: url("/images/contact.jpg");
}

.map-wrapper .vue-map-container {
  height: 320px !important;
}

.contact-wrap {
  padding-bottom: 50px;
}

h1 {
  position: absolute;
  top: 200px;
  left: 50%;
  padding: 0 50px;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 36px;
  font-weight: normal;
  line-height: 1.28em;
  margin-bottom: 107px;
  transform: translateX(-50%);

  @media #{$media_md} {
    position: initial;
    padding: 0;
    text-align: center;
    color: #000000;
    transform: none;
  }

  @media #{$media_lg} {
    text-align: left;
  }
}

.caption {
  font-size: 24px;
  font-weight: 300;
  font-style: normal;
  line-height: 2em;
  color: #000000;
  margin-top: 42px;
  margin-bottom: 42px;

  @media #{$media_lg} {
    font-size: 20px;
    line-height: 1.15em;
    margin-bottom: 20px;
  }
}
</style>
