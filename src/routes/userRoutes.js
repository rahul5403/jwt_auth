const express = require ("express")
const userRouter = express.Router();
const {signUp, signIn, logout }= require("../controllers/userController");
const auth = require("../middlewares/auth");



userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.post("/logout", auth, logout);



module.exports = userRouter