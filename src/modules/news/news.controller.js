const getNews = require("./news.service");

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

exports.fetchNews = async (req, res, next) => {
  try {
    const { category, search, cursor } = req.query;

    const result = await getNews({
      language: req.language, // "en" | "hi"
      category,
      search,
      cursor,
    });

    res.json({
      hasMore: result.hasMore,
      nextCursor: result.nextCursor,
      articles: result.articles.map((a) => ({
        title: a.title,
        image: a.image && a.image.trim() !== "" ? a.image : FALLBACK_IMAGE, // ✅ FIX
        date: a.publishedAt?.split("T")[0],
        content: a.content,
        summary: "Click View More for AI summary",
        source: a.source,
        url: a.url,
      })),
    });
  } catch (err) {
    next(err);
  }
};
