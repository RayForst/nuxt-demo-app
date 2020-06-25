import LocaleService from "@/services/LocaleService";

export default (context, inject) => {
  inject("toLocale", LocaleService.toLocale);
};
