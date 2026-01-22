const groqGenerate = require("../../utils/groqClient");
const { summaryPrompt } = require("../../utils/aiPrompts");

module.exports = async ({ title, content, language }) => {
  const prompt = summaryPrompt({
    title,
    content,
    language: language || "en",
  });

  return await groqGenerate(prompt);
};
