require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const questionRoutes = require('./routes/questionRoutes');


const app = express();
app.use(express.json()); // <--- add this
app.use(express.urlencoded({ extended: true }));


//Middleware to handle CORS

app.use(
    cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
})
);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);


app.use('/api/questions', questionRoutes);

// app.use("/api/ai/generate-questions", ProcessingInstruction, generateInterviewQuestions);
// app.use("api/ai/generate-explanations", ProcessingInstruction, generateConceptExplanation);

//Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}));

//start server
const PORT = 8000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));