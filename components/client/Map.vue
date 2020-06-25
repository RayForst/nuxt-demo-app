<template lang="pug">
  GmapMap(
    :center="{lat: lat,lng: long}"
    :zoom="10"
    map-type-id="terrain"
    style="width: 100%; height: 500px")
    GmapMarker(
      :position="{lat: lat,lng: long}"
      :clickable="true"
      :draggable="true"
      :icon="{ url: '/icons/location-footer.svg'}"
      @click="center=m.position")
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    lat() {
      return +this.$store.state.settings.settings.lat;
    },
    long() {
      return +this.$store.state.settings.settings.long;
    }
  }
};
</script>
