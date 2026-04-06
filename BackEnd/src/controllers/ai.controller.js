const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
  const code = req.body.code;

  if (!code || typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ error: 'Code is required.' });
  }

  if (code.length > 10000) {
    return res
      .status(413)
      .json({ error: 'Code input is too large. Limit to 10,000 characters.' });
  }

  try {
    const response = await aiService(code);
    return res.send(response);
  } catch (error) {
    console.error('AI review failed:', error.message);
    const isApiKeyIssue =
      error.message.includes('API key not valid') ||
      error.message.includes('Missing Gemini API key') ||
      error.message.includes('reported as leaked');
    const isModelIssue =
      error.message.includes('models/') ||
      error.message.includes('not found') ||
      error.message.includes('not supported');

    return res.status(500).json({
      error: isApiKeyIssue
        ? 'Gemini API key is missing, invalid, or blocked. Update BackEnd/.env with a valid GOOGLE_GEMINI_KEY.'
        : isModelIssue
          ? 'Configured Gemini model is unavailable. Update GEMINI_MODEL or use the default model.'
          : 'Failed to generate code review. Please try again.'
    });
  }
};
