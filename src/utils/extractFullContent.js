const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function extractFullContent(url) {
  try {
    const res = await axios.get(url, {
      timeout: 8000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    const $ = cheerio.load(res.data);

    // Remove noise
    $("script, style, nav, footer, header, iframe, ads").remove();

    // Try common article containers
    const selectors = [
      "article",
      ".article-body",
      ".content",
      ".story-content",
      ".entry-content",
      "#article-body",
    ];

    let text = "";

    for (const sel of selectors) {
      if ($(sel).length) {
        text = $(sel).text();
        break;
      }
    }

    return text.replace(/\s+/g, " ").trim();
  } catch {
    return "";
  }
};
