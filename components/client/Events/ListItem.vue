<template lang="pug">
  .event-list-item(
    @click="$router.push(localePath(`/events/${content.slug}`))"
    :class="{ past: isEventPast() }"
  )
    .image-wrap.bg-image(
      :lazy-background="`/uploads/${image}`"
    )
    .container
      .slide-container
        .ui-tag {{ date }}
        .name {{ content.name }}

        nuxt-link(:to="localePath(`/events/${content.slug}`)").ui-button.ui-button--full-green {{ $t('links.discover') }}
</template>

<script>
import DateService from "@/services/DateService";

export default {
  props: ["content"],
  name: "event-list-item",
  data() {
    return {};
  },
  computed: {
    date() {
      return DateService.eventDate(
        this.content.dateStart,
        this.content.dateEnd
      );
    },
    image() {
      return this.content.hasOwnProperty("image")
        ? this.content.image
        : "default.png";
    }
  },
  methods: {
    isEventPast() {
      return DateService.isEventPast(this.content.dateEnd);
    }
  }
};
</script>

<style lang="scss" scoped>
.event-list-item {
  cursor: pointer;
  margin: auto;
  text-align: left;
  position: relative;
  margin-bottom: 40px;

  &.past {
    filter: grayscale(100%);
  }

  &:hover {
    .slide-container {
      transform: translateY(-125px);
    }
  }

  .container {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    color: #fff;
    left: 0;
    padding: 42px;
    overflow: hidden;
  }

  .slide-container {
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: all 0.4s ease;
  }

  .ui-button {
    margin-top: auto;
  }
}

.image-wrap.bg-image {
  &:before {
    padding-top: 54%;
  }
}

.container {
  background-image: linear-gradient(
    to bottom,
    rgba(97, 118, 127, 0),
    rgba(0, 0, 0, 0.61)
  );
}

.name {
  font-family: "Lora";
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.42;
  letter-spacing: normal;
  color: #ffffff;
  padding-top: 20px;
  margin-top: 80px;
  position: relative;

  &:before {
    content: "";
    width: 90px;
    height: 1px;
    position: absolute;
    top: 0;
    left: 0;
    background: #103324;
  }
}

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  display: flex;

  &:before {
    content: "";
    display: block;
    padding-top: 60%;
    background: #fff;
  }
}
</style>
