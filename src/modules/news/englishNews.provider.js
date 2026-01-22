const Parser = require("rss-parser");
const extractImage = require("../../utils/extractImage");
const extractFullContent = require("../../utils/extractFullContent");

const parser = new Parser({
  customFields: {
    item: [
      ["media:thumbnail", "media:thumbnail"],
      ["media:content", "media:content"],
      ["content:encoded", "content:encoded"],
    ],
  },
});

const ENGLISH_FEEDS = [
  // 🌍 International trusted
  { source: "BBC", url: "https://feeds.bbci.co.uk/news/rss.xml" },
  { source: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" },

  // 📰 UK / Global
  { source: "The Guardian World", url: "https://www.theguardian.com/world/rss" },
  { source: "The Guardian Politics", url: "https://www.theguardian.com/politics/rss" },

  // 🇮🇳 Indian English
  { source: "The Hindu", url: "https://www.thehindu.com/news/feeder/default.rss" },
  { source: "Indian Express", url: "https://indianexpress.com/feed/" },
  { source: "Times of India", url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms" },

  // 💼 Business / economy
  { source: "Financial Times", url: "https://www.ft.com/rss/home" },
  { source: "CNBC", url: "https://www.cnbc.com/id/100003114/device/rss/rss.html" },

  // 🧪 Tech / science
  { source: "TechCrunch", url: "https://techcrunch.com/feed/" },
  { source: "Wired", url: "https://www.wired.com/feed/rss" },
];

module.exports = async () => {
  const articles = [];

  for (const feed of ENGLISH_FEEDS) {
    try {
      const data = await parser.parseURL(feed.url);

      for (const item of data.items) {
        // ✅ STEP 1: get best possible RSS content
        let content =
          item["content:encoded"] ||
          item.content ||
          item.summary ||
          item.contentSnippet ||
          "";

        // ✅ STEP 2: fallback to full article ONLY if needed
        if (content.length < 400 && item.link) {
          const fullText = await extractFullContent(item.link);
          if (fullText && fullText.length > content.length) {
            content = fullText;
          }
        }

        articles.push({
          title: item.title,
          content,
          url: item.link,
          image: await extractImage(item),
          publishedAt: item.isoDate || item.pubDate,
          source: feed.source,
          language: "en",
        });
      }
    } catch (e) {
      console.error(`❌ RSS failed: ${feed.source}`, e.message);
    }
  }

  return articles;
};
