exports.summaryPrompt = ({ title, content, language }) => `
You are an educational assistant.

Task:
Create a very short, neutral summary of the following news article.
This is for general awareness and learning purposes only.

Rules:
- Language: ${language === "hi" ? "Hindi" : "English"}
- Length: 5–10 words ONLY
- Tone: Neutral and factual
- Do NOT add opinions, advice, or predictions
- Do NOT persuade or evaluate policies

Article Title:
${title}

Article Content:
${content}

Return only the summary text.
`;


exports.notesPrompt = ({ title, content, language }) => `
You are an educational content assistant.

Task:
Convert the following news article into concise, exam-ready study notes.

Rules:
- Language: ${language === "hi" ? "Hindi" : "English"}
- No opinions, persuasion, or predictions
- No repetition between sections
- Use clear, factual points
- Keep content suitable for UPSC / State PCS exams

IMPORTANT:
Return VALID JSON ONLY.
Do NOT return markdown or plain text.

JSON Format:
{
  "Context / Background": [],
  "Why in News": "",
  "Key Facts": [],
  "Exam Relevance": [],
  "Prelims Pointers": [],
  "Mains Perspective": ""
}

Article Title:
${title}

Article Content:
${content}
`;



exports.mcqPrompt = ({ title, content, language }) => `
You are an educational assessment assistant.

Task:
Generate ONE multiple-choice question for academic practice.

STRICT UNIQUENESS RULE (MANDATORY):
- The question MUST be different every time this prompt is used
- Focus on a DIFFERENT fact, detail, concept, date, definition, or implication each time
- DO NOT repeat previously asked question patterns
- If multiple facts exist, randomly choose ONE
- Never ask the most obvious or headline fact

Rules:
- Language: ${language === "hi" ? "Hindi" : "English"}
- Question must be factual and academic
- No opinion, persuasion, or bias
- Difficulty: Medium
- Avoid generic or predictable questions

Randomization Anchor (DO NOT MENTION IN OUTPUT):
- Random seed: ${Date.now()}
- Vary cognitive focus: definition, cause-effect, comparison, application, inference

Return JSON ONLY in the following structure:
{
  "question": "",
  "options": ["", "", "", ""],
  "correctAnswer": "",
  "explanation": ""
}

Topic:
${title}

Reference Content:
${content}

Final Instruction:
Think carefully and select a UNIQUE angle before forming the question.
`;



exports.subjectivePrompt = ({ title, content, language }) => `
You are an educational assistant.

Task:
Generate ONE neutral, academic-style descriptive question.
This is for learning and practice only.

Rules:
- Language: ${language === "hi" ? "Hindi" : "English"}
- Avoid political opinions or advocacy
- Keep the question analytical but factual

Topic:
${title}

Reference Content:
${content}
`;


exports.evaluatePrompt = ({ question, answer, language }) => `
You are an academic evaluator.

Task:
Provide neutral feedback on the following answer.
This is for learning improvement only.

Rules:
- Language: ${language === "hi" ? "Hindi" : "English"}
- Be objective and constructive
- Avoid ideological or political judgment

Question:
${question}

Answer:
${answer}

Provide concise feedback and improvement tips.
`;
