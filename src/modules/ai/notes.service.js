const groqGenerate = require("../../utils/groqClient");
const { notesPrompt } = require("../../utils/aiPrompts");

module.exports = async ({ title, content, language }) => {
  const prompt = notesPrompt({
    title,
    content,
    language: language || "en",
  });

  return await groqGenerate(prompt);
};
