const Question = require('../models/Question')
const Session = require('../models/Session')


//@desc  Add additional questions to an existing session
//@route  POST /api/questions/add
//@acess Private

exports.addQuestionsToSession = async(req,res)=>{
    try {
         const {sessionId, questions}=req.body;

         if(!sessionId || !questions ||!Array.isArray(questions)){
            return res.status(400).json({message: "Invalid input data"});
         }
         const session = await Session.findById(sessionId);
         if(!session){
            return res.status(404).json({message: "Session not found"});
         }

         //Create newe questions
         const createQuestions = await Question.insertMany(
            questions.map((q)=>({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
         );
         //update session to include new question Ids
         session.questions.push(...createQuestions.map((q)=>q._id));
         await session.save();
         res.status(201).json(createQuestions);
        
    } catch (error) {
        res.status(500).json({message: "server error"});
    }
};

//@desc  Pin or unpin a question
//@route  POST /api/questions/:id/pin
//@acess Private
exports.togglePinQuestion = async(req,res)=>{
    try {
        const question = await Question.findById(req.params.id);

        if(!question){
            return res.status(404).json({message: "Questions not found"});
        }
        question.isPinned = !question.isPinned;
        await question.save();
        res.status(200).json({success:true, question});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
};

//@desc  Update a note for a question
//@route  POST /api/questions/:id/note
//@acess Private
exports.updateQuestionNote = async(req,res)=>{
    try {
        const {note}=req.body;
        const question = await Question.findById(req.params.id);

        if(!question){
            return res.status(404).json({message: "Question not found"});
        }

        question.note = note ||"";
        await question.save();
        res.status(200).json({success:true, question});
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
}; 