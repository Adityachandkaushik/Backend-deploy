// backend/src/middlewares/language.middleware.js
const {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
} = require("../config/language.config");

module.exports = (req, res, next) => {
  let lang = req.headers["x-language"];

  // normalize
  if (typeof lang === "string") {
    lang = lang.toLowerCase();
  }

  req.language = SUPPORTED_LANGUAGES.includes(lang)
    ? lang
    : DEFAULT_LANGUAGE;

  next();
};
