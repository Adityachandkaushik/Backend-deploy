// backend/src/utils/geminiClient.js
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-1.5-flash";

module.exports = async function geminiGenerate(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();

  // 🔥 LOG ONCE IF YOU WANT TO DEBUG
  // console.log(JSON.stringify(data, null, 2));

  // ❌ SAFETY / BLOCKED / EMPTY
  if (!data.candidates || data.candidates.length === 0) {
    return "⚠️ AI response was blocked or unavailable. Please try again later.";
  }

  const parts = data.candidates[0]?.content?.parts;

  // ❌ No text parts
  if (!Array.isArray(parts) || parts.length === 0) {
    return "⚠️ AI could not generate a valid response.";
  }

  // ✅ Extract all text parts safely
  const text = parts
    .map((p) => p.text)
    .filter(Boolean)
    .join("\n")
    .trim();

  return text || "⚠️ AI returned an empty response.";
};
