const { GoogleGenerativeAI } = require("@google/generative-ai");

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
    ""
  ).trim();

  if (!apiKey || apiKey === "your_api_key_here") {
    throw new Error(
      "Missing Gemini API key. Set GOOGLE_GEMINI_KEY or GEMINI_API_KEY in Vercel environment variables."
    );
  }

  return apiKey;
}

function createModel() {
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const genAI = new GoogleGenerativeAI(getApiKey());

  return genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_INSTRUCTION,
  });
}

async function generateReview(code) {
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

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const code = req.body?.code;

  if (!code || typeof code !== "string" || !code.trim()) {
    return res.status(400).json({ error: "Code is required." });
  }

  if (code.length > 10000) {
    return res
      .status(413)
      .json({ error: "Code input is too large. Limit to 10,000 characters." });
  }

  try {
    const review = await generateReview(code);
    return res.status(200).send(review);
  } catch (error) {
    console.error("AI review failed:", error.message);

    const isApiKeyIssue =
      error.message.includes("API key not valid") ||
      error.message.includes("Missing Gemini API key") ||
      error.message.includes("reported as leaked");
    const isModelIssue =
      error.message.includes("models/") ||
      error.message.includes("not found") ||
      error.message.includes("not supported");

    return res.status(500).json({
      error: isApiKeyIssue
        ? "Gemini API key is missing, invalid, or blocked. Update Vercel env var GOOGLE_GEMINI_KEY."
        : isModelIssue
          ? "Configured Gemini model is unavailable. Update GEMINI_MODEL or use the default model."
          : "Failed to generate code review. Please try again.",
    });
  }
};
