// backend/src/modules/practice/practice.service.js
const groqGenerate = require("../../utils/groqClient");
const {
  mcqPrompt,
  subjectivePrompt,
  evaluatePrompt,
} = require("../../utils/aiPrompts");

/**
 * Generate ONE MCQ
 */
exports.generateMCQ = async ({ title, content, language = "en" }) => {
  const prompt = mcqPrompt({
    title,
    content,
    language, // ✅ USE SAME LANGUAGE AS FRONTEND
  });

  const response = await groqGenerate(prompt);

  let raw;
  try {
    raw = JSON.parse(response);
  } catch (err) {
    console.error("RAW MCQ:", response);
    throw new Error("Invalid MCQ JSON");
  }

  const options =
    raw.options ||
    raw.choices ||
    (raw.answers && raw.answers.options);

  if (!options) {
    throw new Error("MCQ options missing from AI response");
  }

  return {
    question: raw.question || "",
    options: Array.isArray(options)
      ? {
          A: options[0],
          B: options[1],
          C: options[2],
          D: options[3],
        }
      : options,
    correctAnswer: raw.correctAnswer || raw.answer,
    explanation: raw.explanation || "",
  };
};

/**
 * Generate ONE subjective question
 */
exports.generateSubjectiveQuestion = async ({
  title,
  content,
  language,
}) => {
  const prompt = subjectivePrompt({
    title,
    content,
    language, // ✅ SAME LANGUAGE
  });

  const question = await groqGenerate(prompt);
  return { question };
};

/**
 * Evaluate subjective answer
 */
exports.evaluateSubjective = async ({
  question,
  answer,
  language,
}) => {
  const prompt = evaluatePrompt({
    question,
    answer,
    language, // ✅ SAME LANGUAGE
  });

  const feedback = await groqGenerate(prompt);
  return { feedback };
};
