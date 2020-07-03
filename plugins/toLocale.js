import LocaleService from "@/services/LocaleService";

// export default (context, inject) => {
//   inject("toLocale", LocaleService.toLocale, context.app.i18n.locale);

//   context.app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
//     console.log(
//       "LANG CHANGE LANG CHANGE LANG CHANGELANG CHANGELANG CHANGELANG CHANGELANG CHANGELANG CHANGELANG CHANGELANG CHANGELANG CHANGELANG CHANGELANG CHANGELANG CHANGE"
//     );
//     inject("toLocale", LocaleService.toLocale, newLocale);
//   };
// };

export default function({ app }, inject) {
  inject("toLocale", LocaleService.toLocale, app.i18n.locale);
}
