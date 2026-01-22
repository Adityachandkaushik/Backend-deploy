// backend/src/modules/ai/notes.controller.js
const generateNotes = require("./notes.service");

exports.getNotes = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const language = req.language || "en";

    // ✅ BASIC VALIDATION
    if (!title || !content) {
      return res.status(200).json({
        notes: "Notes unavailable: missing article content.",
      });
    }

    // 🚫 DISABLE AI FOR POLITY (GUARANTEED EXIT)
    if (category && category.toUpperCase() === "POLITY") {
      return res.status(200).json({
        notes:
          "Smart notes are disabled for polity-related news. Please read the article directly for exam preparation.",
      });
    }

    // ✅ NON-POLITY → TRY AI
    const notes = await generateNotes({
      title,
      content,
      language,
    });

    return res.status(200).json({ notes });
  } catch (err) {
    // 🛡️ NEVER LET NOTES ENDPOINT RETURN 500
    console.error("NOTES CONTROLLER ERROR:", err);

    return res.status(200).json({
      notes: "⚠️ Smart notes are temporarily unavailable.",
    });
  }
};
