// backend/src/routes/index.js
const express = require("express");
const router = express.Router();
const { fetchNews } = require("../modules/news/news.controller");
// backend/src/routes/index.js
const { getSummary } = require("../modules/ai/summary.controller");
const { getNotes } = require("../modules/ai/notes.controller");
// backend/src/routes/index.js
const practice = require("../modules/practice/practice.controller");
// backend/src/routes/index.js
const analytics = require("../modules/analytics/analytics.controller");




router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    language: req.language,
    message: "AI Current Affairs Backend is running 🚀",
  });
});

router.get("/news", fetchNews);
router.post("/summary", getSummary);
router.post("/notes", getNotes);
router.post("/practice/mcq", practice.mcq);
router.post("/practice/subjective", practice.subjective);
router.get("/analytics/report", analytics.report);




module.exports = router;
