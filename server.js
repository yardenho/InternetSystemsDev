const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASA_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => {
    console.error(error);
});

db.once("open", () => {
    console.log("connected to mongo DB");
});

app.use(express.static("public")); //מאפשר גישה לכל מה שנמצא בתקיית public

const postRouter = require("./routes/post_route.js");
app.use("/post", postRouter);

module.exports = app;
