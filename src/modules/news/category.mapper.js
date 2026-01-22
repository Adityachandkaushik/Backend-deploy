// category.mapper.js
module.exports = (category) => {
  const map = {
    SPORTS: "sports",
    EDUCATION: "education",
    HEALTH: "health",
    ECONOMY: "business",
    POLITY: "politics",
    SCIENCE: "science",
    WORLD: "world",
  };

  return map[category] || "";
};
