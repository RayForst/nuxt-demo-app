const DEFAULT_FIELD_LOCALE = "en";

export default {
  toLocale(item, field, locale = "lv", debug = false) {
    if (!item) return "";
    const fieldDef = field;

    if (locale !== DEFAULT_FIELD_LOCALE) field += `_${locale}`;
    return item[field] ? item[field] : item[fieldDef];
  }
};
