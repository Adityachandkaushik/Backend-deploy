const fetchEnglish = require("./englishNews.provider");
const fetchHindi = require("./hindiNews.provider");
const mapHindiCategory = require("./hindiCategory.mapper");
const mapEnglishCategory = require("./category.mapper");

module.exports = async ({ language, category, search, cursor }) => {
  let articles =
    language === "hi" ? await fetchHindi() : await fetchEnglish();

  // ✅ sanitize
  articles = articles.filter(
    (a) => a.title && a.url && a.publishedAt
  );

  // ✅ CATEGORY / SEARCH FILTER
  if (category || search) {
    const keyword =
      search ||
      (language === "hi"
        ? mapHindiCategory(category)
        : mapEnglishCategory(category));

    if (keyword) {
      const regex = new RegExp(
        keyword.split(" OR ").join("|"),
        "i"
      );

      articles = articles.filter(
        (a) =>
          regex.test(a.title) ||
          regex.test(a.content || "")
      );
    }
  }

  // ✅ latest first
  // articles.sort(
  //   (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  // );

  // ✅ cursor pagination
  if (cursor) {
    articles = articles.filter(
      (a) => new Date(a.publishedAt) < new Date(cursor)
    );
  }

  return {
    articles,
    hasMore: articles.length > 0,
    nextCursor: articles.at(-1)?.publishedAt || null,
  };
};
