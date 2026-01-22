// backend/src/modules/analytics/analytics.model.js
const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["MCQ", "SUBJECTIVE"],
    required: true,
  },
  topic: String,          // derived from category / title
  score: Number,          // 1 or 0 for MCQ, % for subjective
  language: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Analytics", AnalyticsSchema);
