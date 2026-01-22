const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

module.exports = async function groqGenerate(prompt) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", // ✅ supported model
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3, // good for summaries
  });

  return completion.choices[0].message.content.trim();
};
