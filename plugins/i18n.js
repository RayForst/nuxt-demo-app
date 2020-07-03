import moment from "moment";

export default function({ app }) {
  moment.locale(app.i18n.locale);

  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    moment.locale(newLocale);
  };
}
