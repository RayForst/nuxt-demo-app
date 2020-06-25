import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBiqPVo8Anjm534FSZ4-89L1H1yZxfQWvU",
    libraries: "places",
    installComponents: true
  }
});
