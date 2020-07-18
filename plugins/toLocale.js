import LocaleService from "@/services/LocaleService";

export default function({ app }, inject) {
  inject("toLocale", LocaleService.toLocale, app.i18n.locale);
}
