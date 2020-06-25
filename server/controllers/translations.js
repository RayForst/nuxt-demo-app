const fs = require("fs");
const path = require("path");
const availableFormats = ["ru", "en", "lv"];

async function index() {
  try {
    const lang = "ru";

    if (availableFormats.includes(lang)) {
      const file = path.join(__dirname, "../locales/" + lang + ".json");

      return JSON.parse(fs.readFileSync(file, "utf8"), function(k, v) {
        return v; // возвращаем неизменённое значение свойства
      });
    } else {
      throw "Bad language";
    }
  } catch (err) {
    return {};
  }
}

export { index };
