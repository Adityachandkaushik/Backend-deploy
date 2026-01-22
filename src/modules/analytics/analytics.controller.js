// backend/src/modules/analytics/analytics.controller.js
const service = require("./analytics.service");

exports.report = async (req, res, next) => {
  try {
    const data = await service.getReport();
    res.json(data);
  } catch (e) {
    next(e);
  }
};
