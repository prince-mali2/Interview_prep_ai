const express = require("express")
const {registerUser, loginUser, getUserProfile} = require("../controllers/authController");
const {protect} = require("../middlewares/authMiddleware")


const router = express.Router();

//Authroutes

router.post("/register", registerUser); // Register User
router.post("/login", loginUser); //Login User
router.get("/profile",protect, getUserProfile); // get User Profile

module.exports = router;