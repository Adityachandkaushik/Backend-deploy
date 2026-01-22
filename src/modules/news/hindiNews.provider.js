const Parser = require("rss-parser");
const extractImage = require("../../utils/extractImage");

const parser = new Parser({
  customFields: {
    item: [
      ["media:thumbnail", "media:thumbnail"],
      ["media:content", "media:content"],
      ["content:encoded", "content:encoded"],
    ],
  },
});

// 🔝 PRIORITY 1 (LOAD FIRST)
const PRIORITY_FEEDS = [
  { source: "BBC Hindi", url: "https://feeds.bbci.co.uk/hindi/rss.xml" },
  { source: "Zee News Hindi", url: "https://zeenews.india.com/hindi/rss.xml" },
];

// 🔽 PRIORITY 2 (LOAD AFTER)
const SECONDARY_FEEDS = [
  { source: "Amar Ujala", url: "https://www.amarujala.com/rss/breaking-news.xml" },
  { source: "Aaj Tak", url: "https://www.aajtak.in/rssfeeds/?id=home" },
];

// 🔁 helper
async function loadFeeds(feeds, articles) {
  for (const feed of feeds) {
    try {
      const data = await parser.parseURL(feed.url);

      for (const item of data.items) {
        articles.push({
          title: item.title,
          content: item.contentSnippet || "",
          url: item.link,
          image: await extractImage(item),
          publishedAt: item.isoDate || item.pubDate,
          source: feed.source,
          language: "hi",
          priority: feed.priority, // 👈 IMPORTANT
        });
      }
    } catch (e) {
      console.error(`❌ RSS failed: ${feed.source}`, e.message);
    }
  }
}


module.exports = async () => {
  const articles = [];

  // ✅ LOAD HIGH PRIORITY FIRST
  await loadFeeds(PRIORITY_FEEDS, articles);

  // ✅ THEN LOAD SECONDARY SOURCES
  await loadFeeds(SECONDARY_FEEDS, articles);

  return articles;
};
