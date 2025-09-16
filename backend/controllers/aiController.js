const {GoogleGenAI} =require('@google/genai');
const {conceptExplainprompt, questionAnswerPrompt} = require("../utils/prompts");

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});


// @desc  Generate interview question and answer using gemini
// @route   POST /api/ai/generate-questions
//@access   Private

const generateInterviewQuestions = async(req, res)=>{
    try {
        const {role, experience, topicsToFocus, numberOfQuestions} = req.body;

        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(400).json({message:"Missing required fields"});
        }
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt
        });

        let rawText = response.text;

        //clean it: Remove ```json and ``` from the begining and end
        const cleanedText = rawText
  .replace(/^```(?:json)?\s*/i, "") // remove ``` or ```json (case-insensitive)
  .replace(/```\s*$/, "")           // remove ending ``` + possible spaces/newlines
  .trim();

        //now safe to parse
        const data = JSON.parse(cleanedText);
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            message: "Failed to generate question",
            error: error.message
        });
    }
};

//@desc    Generate explains a interview question
// @route  POST /api/ai/generate-explanation
//@access  Private

const generateConceptExplanation = async(req,res)=>{
    try {
        const {question} = req.body;

        if(!question){
            return res.status(400).json({message: "Missing required fields"});

        }
        const prompt = conceptExplainprompt(question);
        
            const response = await ai.models.generateContent({
                model:"gemini-2.0-flash-lite",
                contents: prompt,
            });

            let rawText = response.text;


        //clean it: Remove ```json and ``` from the begining and end
        const cleanedText = rawText
  .replace(/^```(?:json)?\s*/i, "") // remove ``` or ```json (case-insensitive)
  .replace(/```\s*$/, "")           // remove ending ``` + possible spaces/newlines
  .trim();

        //now safe to parse
        const data = JSON.parse(cleanedText);
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            message: "Failed to generate question",
            error: error.message
        });
    }
    
    
};
module.exports ={generateInterviewQuestions,generateConceptExplanation};