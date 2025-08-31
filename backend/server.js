require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');

const app = express();

//Middleware to handle CORS

app.use(
    cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
})
);

connectDB();

//MiddleWare
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`, req.body || {});
  next();
});

//Routes
app.use("/api/auth", authRoutes);
console.log("after middleware");

// app.use("api/sessions", sessionRoutes);
// app.use('/api/questions', questionRoutes);

// app.use("/api/ai/generate-questions", ProcessingInstruction, generateInterviewQuestions);
// app.use("api/ai/generate-explanations", ProcessingInstruction, generateConceptExplanation);

//Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}));

//start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));