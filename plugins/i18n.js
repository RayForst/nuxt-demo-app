import moment from "moment";
import en from "vee-validate/dist/locale/en.json";
import ru from "vee-validate/dist/locale/ru.json";
import lv from "vee-validate/dist/locale/lv.json";
import { localize } from "vee-validate";

const locales = {
  lv,
  ru,
  en
};

export default function({ app }) {
  moment.locale(app.i18n.locale);

  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    moment.locale(newLocale);
    localize(newLocale, locales[newLocale]);
  };
}
