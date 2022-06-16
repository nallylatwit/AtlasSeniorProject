const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, () => {
    console.log("Connected to MongoDB");
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

/* 
This is a 'route' to the homepage, localhost:8800 in the url
But we will be creating whole files for the 'routes' instead
*/
/*
app.get("/", (req, res) => {
    res.send("Welcome to homepage.");
});
*/

app.listen(8800, () => {
    console.log("Backend server is running.");
});