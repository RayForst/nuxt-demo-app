<template lang="pug">
section.hero(
  ref="hero"
)
  carousel(
    loop=true 
    :items=1
    :dots="false" 
    :nav="false"
    :autoplay="true"
    :autoplayTimeout="5300"
    :autoplaySpeed="700"
  )
    div.container.bg-image.hero-main(
      v-for="event, i in events" 
      :key="i"
      :style="{ 'background-image': `url(${image(event)})` }"
    )
      .row.center-xs.height-100
        .col-xs-11.col-md-7.align-center.text-center.text-container
          template(v-if="event.preview")
            .preview
              h2(v-html="$toLocale(event, 'name', $i18n.locale)")
              h1(v-html="$toLocale(event, 'caption', $i18n.locale)")
          template(v-else)
            div
              h2(v-html="$toLocale(event, 'name', $i18n.locale)")
              h1(v-html="$toLocale(event, 'caption', $i18n.locale)")
              span.date {{ date(event.dateStart, event.dateEnd) }}
              div.button-wrap
                nuxt-link(:to="localePath(`/events/${event.slug}`)").ui-button.ui-button--full-green {{ $t('links.discover') }}
</template>

<script>
import DateService from "@/services/DateService";

export default {
  name: "app-hero",
  props: ["events"],
  methods: {
    image(item) {
      const img = item.image != "" ? item.image : "default.png";

      return "/uploads/" + img;
    },
    dateFormat(date) {
      return `${date.date()} ${date.format("MMMM")}`;
    },
    date(start, end) {
      return DateService.eventDate(start, end);
    }
  },
  mounted() {
    this.$refs.hero.style.opacity = 1;
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.hero {
  height: 520px;
  // background: #f7f7f7;
  transition: opacity 0.4s ease-out;
  margin-bottom: 20px;
  overflow: hidden;
  opacity: 0;

  @media #{$media_sm} {
    height: 590px;
  }

  @media #{$media_lg} {
    margin-top: 20px;
  }
}

.preview {
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 26px;
  line-height: 1.5em;

  @media #{$media_lg} {
    font-size: 36px;
  }
}

h2 {
  margin: 0;
  font-size: 18px;
  line-height: 1.5em;

  @media #{$media_md} {
    font-size: 21px;
  }
}

.text-container {
  z-index: 200;
}
.button-wrap {
  margin-top: 35px;
}
.date {
  font-family: "Lora", sans-serif;
  font-weight: bold;
  font-size: 24px;
  line-height: 1.42;
}

a {
  color: #fff;
  text-decoration: none;
}

.hero-main {
  height: 520px;
  position: relative;

  @media #{$media_sm} {
    height: 442px;
  }

  @media #{$media_sm} {
    height: 590px;
  }

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    background-image: linear-gradient(
      to bottom,
      rgba(97, 118, 127, 0),
      rgba(0, 0, 0, 0.81)
    );
  }
}
</style>
