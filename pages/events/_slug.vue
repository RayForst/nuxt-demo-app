<template lang="pug">
.event
  vue-easy-lightbox(
    v-if="gallery && gallery.length > 1"
    :visible="galleryVisible"
    :imgs="gallery"
    :index="index"
    @hide="handleHide"
  )
  section.hero
    .bg-image.hero-main.bg-hero(
                      :lazy-background="image"
      )
      .content-container.content
        .row.center-xs
          .col-xs-10.col-lg-12.text-start
            .ui-tag {{ date }}
            h1 {{ $toLocale(event, 'name', $i18n.locale) }}
  .content-container.content
    .row.center-xs
      .col-xs-10.col-lg-12.text-start
        p(v-html="$toLocale(event, 'description', $i18n.locale)")
      .col-xs-10.col-lg-12.text-start
        .carousel-wrap
          carousel(
            loop=true 
            :items=3
            :dots="true" 
            :nav="false"
            :margin="10"
          )
            .square-block(
              v-for="(src, index) in gallery"
              :lazy-background="src"
              @click="() => showImg(index)"
            )
  .spacer
  .spacer
  input(id="hidden" type="hidden" :value="event.id")
  app-seminar-subscribe
</template>

<script>
import appSeminarSubscribe from "@/components/client/Events/Subscribe";
import DateService from "@/services/DateService";

export default {
  name: "event",
  metaInfo: {
    title: "Example Event"
  },
  async asyncData({ app, params }) {
    try {
      const event = await app.$api("get", "event", {
        params: {
          slug: params.slug
        }
      });

      return { event };
    } catch (err) {
      console.log(err.path, err.statusMessage);
    }
  },
  components: {
    appSeminarSubscribe
  },
  data() {
    return {
      galleryVisible: false,
      index: 0
    };
  },
  computed: {
    id() {
      return this.event.id;
    },
    image() {
      return `/uploads/${this.event.image}`;
    },
    date() {
      return DateService.eventDate(this.event.dateStart, this.event.dateEnd);
    },
    gallery() {
      if (this.event.images === "") return false;

      return this.event.images.split(",").map(function(image) {
        return "/uploads/" + image;
      });
    }
  },
  head() {
    return {
      title: this.event.name
    };
  },
  methods: {
    dateFormat(date) {
      return `${date.date()} ${date.format("MMMM")}`;
    },
    showImg(index, key) {
      this.index = index;
      this.galleryVisible = true;

      document.body.classList.add("hidden-scroll");
    },
    handleHide() {
      this.galleryVisible = false;

      document.body.classList.remove("hidden-scroll");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

h1 {
  font-size: 36px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.28em;
  letter-spacing: normal;
  color: #ffffff;
}

.bg-hero {
  background-image: url("/images/banner-events.jpg");
}

p {
  font-size: 18px;
  font-weight: 300;
  line-height: 1.83em;
  color: #000000;

  &.gray {
    color: #7e8f97;
  }
}

.event {
  @media #{$media_lg} {
    margin-top: 18px;
  }
}
</style>
