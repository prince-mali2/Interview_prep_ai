const { GoogleGenAI } = require('@google/genai');
const { conceptExplainprompt, questionAnswerPrompt } = require("../utils/prompts");

// Lazy-init AI client so missing API key is caught at request time with a clear error
function getAI() {
    const apiKey = process.env.GEMINI_API_KEY;
  
    
    if (!apiKey || apiKey.trim() === '') {
        const err = new Error('GEMINI_API_KEY is not set. Add it in Render Dashboard → Environment.');
        err.code = 'MISSING_API_KEY';
        throw err;
    }
    return new GoogleGenAI({ apiKey });
}

// @desc  Generate interview question and answer using gemini
// @route   POST /api/ai/generate-questions
// @access  Private
const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const ai = getAI();
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt
        });

        const rawText = response?.text;
        if (rawText == null || typeof rawText !== 'string') {
            console.error('Gemini returned no text:', JSON.stringify(response, null, 2));
            return res.status(502).json({
                message: "AI returned an empty or invalid response. Please try again."
            });
        }

        const cleanedText = rawText
            .replace(/^```(?:json)?\s*/i, "")
            .replace(/```\s*$/, "")
            .trim();

        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch (parseErr) {
            console.error('Gemini response was not valid JSON:', rawText?.slice(0, 500));
            return res.status(502).json({
                message: "AI response was invalid. Please try again."
            });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('generateInterviewQuestions error:', error?.message || error);

        if (error?.code === 'MISSING_API_KEY') {
            return res.status(503).json({
                message: "AI service is not configured. Please set GEMINI_API_KEY in your deployment environment (e.g. Render Dashboard → Environment)."
            });
        }

        const message = error?.message || '';
        const isAuthError = /API key|invalid.*key|403|401|quota/i.test(message);
        const safeMessage = isAuthError
            ? "Invalid or missing Gemini API key. Check GEMINI_API_KEY in Render environment variables."
            : "Failed to generate questions. Please try again later.";

        res.status(500).json({
            message: safeMessage,
            ...(process.env.NODE_ENV !== 'production' && { error: error.message })
        });
    }
};

// @desc   Generate explanation for an interview question
// @route  POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const ai = getAI();
        const prompt = conceptExplainprompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });

        const rawText = response?.text;
        if (rawText == null || typeof rawText !== 'string') {
            console.error('Gemini returned no text for explanation');
            return res.status(502).json({
                message: "AI returned an empty or invalid response. Please try again."
            });
        }

        const cleanedText = rawText
            .replace(/^```(?:json)?\s*/i, "")
            .replace(/```\s*$/, "")
            .trim();

        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch (parseErr) {
            console.error('Gemini explanation response was not valid JSON');
            return res.status(502).json({
                message: "AI response was invalid. Please try again."
            });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('generateConceptExplanation error:', error?.message || error);

        if (error?.code === 'MISSING_API_KEY') {
            return res.status(503).json({
                message: "AI service is not configured. Please set GEMINI_API_KEY in your deployment environment."
            });
        }

        const message = error?.message || '';
        const isAuthError = /API key|invalid.*key|403|401|quota/i.test(message);
        const safeMessage = isAuthError
            ? "Invalid or missing Gemini API key. Check GEMINI_API_KEY in Render environment variables."
            : "Failed to generate explanation. Please try again later.";

        res.status(500).json({
            message: safeMessage,
            ...(process.env.NODE_ENV !== 'production' && { error: error.message })
        });
    }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };