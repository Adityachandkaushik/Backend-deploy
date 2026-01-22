// backend/src/utils/textUtils.js
exports.trimContent = (text, maxLength = 3000) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.slice(0, maxLength) + "..."
    : text;
};
