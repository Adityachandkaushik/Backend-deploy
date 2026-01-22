module.exports = (category) => {
  const map = {
    SPORTS: "खेल OR क्रिकेट OR फुटबॉल OR टूर्नामेंट",
    HEALTH: "स्वास्थ्य OR बीमारी OR अस्पताल OR दवा",
    ECONOMY: "अर्थव्यवस्था OR महंगाई OR बजट OR रोजगार",
    POLITY: "राजनीति OR सरकार OR संसद OR चुनाव",
    SCIENCE: "विज्ञान OR अनुसंधान OR अंतरिक्ष",
    TECHNOLOGY: "प्रौद्योगिकी OR टेक्नोलॉजी OR AI OR मोबाइल",
    BUSINESS: "व्यापार OR उद्योग OR शेयर बाजार",
    EDUCATION: "शिक्षा OR परीक्षा OR विश्वविद्यालय",
    ENVIRONMENT: "पर्यावरण OR जलवायु OR प्रदूषण",
    WORLD: "विश्व OR अंतरराष्ट्रीय OR विदेश नीति",
  };

  return map[category] || "भारत";
};
