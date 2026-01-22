const crypto = require("crypto");

module.exports = (question) => {
  return crypto
    .createHash("sha256")
    .update(question.toLowerCase().replace(/\s+/g, " ").trim())
    .digest("hex");
};
