const service = require("./practice.service");

const analyticsService = require("../analytics/analytics.service");

exports.mcq = async (req, res, next) => {
  try {
    const mcq = await service.generateMCQ(req.body);

    // ❌ TEMP DISABLE (Mongo not connected)
    // await analyticsService.saveAttempt({
    //   type: "MCQ",
    //   topic: req.body.title,
    //   score: 1,
    //   language: req.body.language || "en",
    // });

    res.status(200).json({
      success: true,
      data: mcq,
    });
  } catch (e) {
    console.error("MCQ CONTROLLER ERROR:", e.message);
    next(e);
  }
};



exports.subjective = async (req, res, next) => {
  try {
    if (!req.body.answer) {
      const q = await service.generateSubjectiveQuestion(req.body);
      return res.json(q);
    }

    const evaluation = await service.evaluateSubjective(req.body);
    res.json(evaluation);
  } catch (e) {
    next(e);
  }
};
