<template lang="pug">
  .events
    .content-container.content
      app-list(:items="events")
    app-subscribe
</template>

<script>
import moment from "moment";
import appSubscribe from "@/components/client/Subscribe";
import appList from "@/components/client/Events/List";

export default {
  name: "product",
  async asyncData({ app }) {
    try {
      const events = await app.$api("get", "events");

      return { events };
    } catch (err) {
      console.log(err.path, err.statusMessage);
    }
  },
  data() {
    return {
      items: [],
      date: moment()
    };
  },
  head() {
    return {
      title: "Events"
    };
  },
  components: {
    appList,
    appSubscribe
    // appEventCalendar: () => import("@/components/events/Calendar")
  },
  methods: {
    // async get() {
    //   const events = (
    //     await contentService.events.get({
    //       year: this.date.year(),
    //       month: this.date.month() + 1
    //     })
    //   ).data;
    //   this.items = events;
    //   EventBus.$emit("calendar-item-get", true);
    // }
  },
  mounted() {
    // this.get();
    // EventBus.$on("draw-calendar", direction => {
    //   let date = this.date;
    //   let that = this;
    //   this.date = "";
    //   if (direction === "next") {
    //     date.add(1, "months");
    //   } else {
    //     date.subtract(1, "months");
    //   }
    //   setTimeout(function() {
    //     that.date = date;
    //     that.get();
    //   }, 50);
    // });
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/base/_variables";

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  background-image: url("https://cdn.shopify.com/s/files/1/1068/2502/products/Shadow-Aloe-Infusion-9oz_d3ec928d-c570-4b86-afb9-f8f985547468.jpg");
  display: flex;
  background-color: var(--c_primary);

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
    background: #fff;
  }
}
</style>
