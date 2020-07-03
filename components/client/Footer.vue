<template lang="pug">
  footer.main
    .content-container
      .row.test.center-xs.middle-xs.start-md
        .col-xs-10.col-lg-12
          .row.menu
            .col-xs-12.col-sm-6.col-lg-3(
              v-for="i in 4"
            )
              template(v-for="column, index in menu")
                nav(v-if="i == column.categoryIndex")
                  h4 {{ categoryText(column) }}
                  ul
                    li(v-for="link in column.links ")
                      nuxt-link(
                        :to="url(link)"
                      ).footer-link.ui-link {{ text(link) }}          
          hr  
          .row.contacts
            .col-xs-12.col-md-12.col-lg-2.center-xs.start-lg.first-lg.middle-xs
              app-social-buttons(:colorClass="socialColor")
            .col-xs-12.col-lg-8.first-md.align-center
              app-short-contacts
            .col-xs-12.text-center.last-xs.logo-wrap
              app-logo
            .col-xs-12.col-lg-2.text-center.last-md.first-lg.align-center
              .copyright © {{ copyright }}{{ new Date().getFullYear() }}
</template>

<script>
import appLogo from "@/components/client/Logo";
import appSocialButtons from "@/components/client/SocialButtons";
import appShortContacts from "@/components/client/ShortContacts";

export default {
  data() {
    return {
      socialColor: "gray",
      mount: false
    };
  },
  methods: {
    url(link) {
      if (link.route.hasOwnProperty("slug") && link.route.slug) {
        return this.localePath(`/${link.route.name}/${link.route.slug}`);
      } else return this.localePath(`${link.route.name}`);
    },
    categoryText(menuItem) {
      return menuItem.hasOwnProperty("i18n")
        ? this.$t(menuItem.category)
        : this.$toLocale(menuItem, "category", this.$i18n.locale);
    },
    text(link) {
      return link.hasOwnProperty("i18n")
        ? this.$t(link.title)
        : this.$toLocale(link, "title", this.$i18n.locale);
    }
  },
  computed: {
    copyright() {
      return this.$store.state.settings.settings.copyright;
    },
    menu: function() {
      return this.$store.state.menu.menu;
    }
  },
  components: {
    appLogo,
    appSocialButtons,
    appShortContacts
  },
  mounted() {
    this.mount = true;
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/base/_variables";

/* text alignment */
.contact-details {
  text-align: start;
}

footer.main {
  background-color: var(--c_gray3);
  color: #fff;
  padding: 50px 0 30px;
}

.container {
  text-align: left;
}

h4 {
  font-size: 14px;
  line-height: 1.14em;
  letter-spacing: 0.18em;
  color: var(--c_gray4);
  text-transform: uppercase;
}

.footer-link {
  font-size: 16px;
  font-weight: 300;
  color: #4a4a4a;
  line-height: 22px;
  margin-bottom: 23px;
  display: inline-flex;
  transition: color 0.3s ease;
  max-width: 205px;

  &:hover {
    color: #000;
    font-weight: 400;
  }
}

.contact-details {
  font-size: 18px;
  font-family: "Lora", sans-serif;
}

.copyright {
  font-size: 16px;
  font-weight: 300;
  color: #4a4a4a;
}

.logo-wrap {
  margin-top: 40px;
  margin-bottom: 40px;

  @media #{$media_lg} {
    margin-top: 70px;
    margin-bottom: 0;
  }
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 25px 0;
}

.menu {
  padding: 30px 0;
}

.logo {
  margin-top: 70px;
}

.contacts {
  padding: 40px 0 30px 0;
}
</style>
