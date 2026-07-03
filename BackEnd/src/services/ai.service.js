const { GoogleGenerativeAI } = require("@google/generative-ai");

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const SYSTEM_INSTRUCTION = `
You are a senior code reviewer with 7+ years of experience.

Review the submitted code for:
- correctness and bugs
- readability and maintainability
- performance issues
- security concerns
- scalability concerns
- testing gaps

Response rules:
- be constructive and concise
- explain why each issue matters
- include improved code snippets when useful
- use Markdown formatting
- highlight strengths briefly when relevant
`;

function getApiKey() {
  const apiKey = (
    process.env.GOOGLE_GEMINI_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.gOOGLE_GEMINI_KEY ||
    ""
  ).trim();

  if (!apiKey || apiKey === "your_api_key_here") {
    throw new Error(
      "Missing Gemini API key. Set GOOGLE_GEMINI_KEY or GEMINI_API_KEY in BackEnd/.env."
    );
  }

  return apiKey;
}

function createModel() {
  const genAI = new GoogleGenerativeAI(getApiKey());

  return genAI.getGenerativeModel({
    model: DEFAULT_MODEL,
    systemInstruction: SYSTEM_INSTRUCTION,
  });
}

async function generateContent(code) {
  if (!code || typeof code !== "string" || !code.trim()) {
    throw new Error("Prompt is required and must be a non-empty string.");
  }

  const model = createModel();
  const result = await model.generateContent([
    {
      text: `Review this code and suggest improvements:\n\n\`\`\`\n${code.trim()}\n\`\`\``,
    },
  ]);
  const text = result?.response?.text?.();

  if (!text) {
    throw new Error("Invalid response from Gemini API.");
  }

  return text;
}

module.exports = generateContent;
