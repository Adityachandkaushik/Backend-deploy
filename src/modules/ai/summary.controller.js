// backend/src/modules/ai/summary.controller.js
const generateSummary = require("./summary.service");

exports.getSummary = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const language = req.language || "en";

    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content are required",
      });
    }

    // 🚫 DISABLE AI FOR POLITY
    if (category === "POLITY") {
      return res.status(200).json({
        summary:
          "This news is related to polity. Please read the full article for detailed understanding.",
      });
    }

    const summary = await generateSummary({
      title,
      content,
      language,
    });

    res.json({ summary });
  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    res.status(200).json({
      summary: "⚠️ AI summary unavailable at the moment.",
    });
  }
};
