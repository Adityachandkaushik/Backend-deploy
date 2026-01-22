module.exports = function sanitizeContent(text) {
  if (!text) return "";

  return text
    // remove URLs
    .replace(/https?:\/\/\S+/g, "")
    // remove quotes
    .replace(/["“”]/g, "")
    // remove political trigger words (IMPORTANT)
    .replace(
      /\b(government|minister|policy|election|party|parliament|bill|act|court|judgment)\b/gi,
      ""
    )
    // shrink whitespace
    .replace(/\s+/g, " ")
    // hard limit
    .slice(0, 2000);
};
