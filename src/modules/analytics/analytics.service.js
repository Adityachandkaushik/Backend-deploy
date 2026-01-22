// backend/src/modules/analytics/analytics.service.js
const Analytics = require("./analytics.model");

exports.saveAttempt = async ({ type, topic, score, language }) => {
  return Analytics.create({ type, topic, score, language });
};

exports.getReport = async () => {
  const attempts = await Analytics.find();

  const total = attempts.length;
  const avgScore =
    total === 0
      ? 0
      : (
          attempts.reduce((sum, a) => sum + (a.score || 0), 0) / total
        ).toFixed(2);

  const topicMap = {};
  attempts.forEach((a) => {
    if (!topicMap[a.topic]) {
      topicMap[a.topic] = { total: 0, score: 0 };
    }
    topicMap[a.topic].total += 1;
    topicMap[a.topic].score += a.score || 0;
  });

  const weakAreas = Object.entries(topicMap)
    .map(([topic, data]) => ({
      topic,
      accuracy: ((data.score / data.total) * 100).toFixed(0),
    }))
    .filter((t) => t.accuracy < 50);

  return {
    totalAttempts: total,
    averageScore: avgScore,
    weakAreas,
  };
};
