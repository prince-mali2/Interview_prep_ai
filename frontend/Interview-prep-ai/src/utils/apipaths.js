export const BASE_URL = "https://interview-prep-ai-ki57.onrender.com";

export const API_PATHS = {
    AUTH:{
        REGISTER: "/api/auth/register",//Signup
        LOGIN: "/api/auth/login",// Authenticate user and return JWT token
        GET_PROFILE: "/api/auth/profile", //// Get logged in user details
    },

    IMAGE:{
        UPLOAD_IMAGE: "/api/auth/upload-image",// upload profile picture
    },

    AI:{
        GENERATE_QUESTIONS: 'api/ai/generate-questions',//Generate interview questions and answer using gemini
        GENERATE_EXPLANATION: "/api/ai/generate-explanations", //Generate concept explanation using gemini
    },

    SESSION: {
        CREATE: "/api/sessions/create", // CReate a new interview session with questions
        GET_ALL : "/api/sessions/my-sessions",//Get all user session
        GET_ONE: (id)=> `/api/sessions/${id}`,//Get session details with questions
        DELETE: (id)=>`/api/sessions/${id}`, //DELETE a session
    },

    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add", //add more questions to session
        PIN: (id)=>`/api/questions/${id}/pin`,//PIN or Unpin a question
        UPDATE_NOTE: (id)=>`/api/questions/${id}/note`, //Update or add a note to question
    },
};