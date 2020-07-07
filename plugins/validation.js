import Vue from "vue";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import ru from "vee-validate/dist/locale/ru.json";
import lv from "vee-validate/dist/locale/lv.json";
import { required, email } from "vee-validate/dist/rules";

// Add a rule.
extend("secret", {
  validate: value => value === "example",
  message: "This is not the magic word"
});

extend("email", email);

localize("lv", lv);

// Register it globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
