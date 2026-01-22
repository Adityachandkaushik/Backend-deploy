module.exports = function extractImage(item) {
  // ✅ 1. media:thumbnail (BBC, some Hindi)
  const thumb = item["media:thumbnail"];
  if (thumb) {
    if (Array.isArray(thumb) && thumb[0]?.$?.url) {
      return thumb[0].$.url;
    }
    if (thumb.$?.url) {
      return thumb.$.url;
    }
  }

  // ✅ 2. media:content (Aaj Tak, Reuters, etc.)
  const media = item["media:content"];
  if (media) {
    if (Array.isArray(media) && media[0]?.$?.url) {
      return media[0].$.url;
    }
    if (media.$?.url) {
      return media.$.url;
    }
  }

  // ✅ 3. enclosure (rare but valid)
  if (item.enclosure?.url) {
    return item.enclosure.url;
  }

  // ✅ 4. HTML parsing (Guardian, Hindu, Amar Ujala, Aaj Tak)
  const html =
    item["content:encoded"] ||
    item.content ||
    item.summary ||
    "";

  if (html) {
    // 🔹 srcset (best quality)
    const srcsetMatch = html.match(/srcset=["']([^"']+)["']/i);
    if (srcsetMatch) {
      return srcsetMatch[1].split(",")[0].trim().split(" ")[0];
    }

    // 🔹 lazy-loaded images (Amar Ujala, Aaj Tak)
    const dataSrcMatch = html.match(
      /<img[^>]+(data-src|data-original|data-lazy-src)=["']([^"']+)["']/i
    );
    if (dataSrcMatch && dataSrcMatch[2]) {
      return dataSrcMatch[2];
    }

    // 🔹 normal img src
    const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  return null;
};
