const generateContent = require("../BackEnd/src/services/ai.service");

module.exports = async (req, res) => {
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
    const response = await generateContent(code);
    return res.status(200).send(response);
  } catch (error) {
    const message = String(error?.message || "");
    const isApiKeyIssue =
      message.includes("API key not valid") ||
      message.includes("Missing Gemini API key") ||
      message.includes("reported as leaked");
    const isModelIssue =
      message.includes("models/") ||
      message.includes("not found") ||
      message.includes("not supported");

    return res.status(500).json({
      error: isApiKeyIssue
        ? "Gemini API key is missing, invalid, or blocked. Set a valid GOOGLE_GEMINI_KEY in Vercel Environment Variables."
        : isModelIssue
          ? "Configured Gemini model is unavailable. Update GEMINI_MODEL or use the default model."
          : "Failed to generate code review. Please try again.",
    });
  }
};
