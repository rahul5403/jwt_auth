const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use("/users", userRouter);

app.get("/", (req, res)=>{
    res.send({message: "Hello from Rahul"});
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT   }`);
});