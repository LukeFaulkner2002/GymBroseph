//Required stuff
import express from "express";
import { resolve } from "path";
import { json } from "body-parser";
import cors from "cors";
import blueimp from "blueimp-md5";
import mongoose from "mongoose";

//import routes
const answerRoutes = require("./routes/answers");
const exerciseroutineRoutes = require("./routes/exerciseroutines");
const exerciseRoutes = require("./routes/exercises");
const routineRoutes = require("./routes/routines");

const PORT = process.env.PORT || 5000;
const app = express();
app.set("port", process.env.PORT || 5000);

//MongoDB stuff
require("dotenv").config();
const url = process.env.MONGODB_URI;
import { MongoClient } from "mongodb";
mongoose.connect(url).then(() => {
	console.log("connected to database");
	app.listen(app.get("port"));
});

//Set up production env
if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));
	app.get("*", (req, res) => {
		res.sendFile(resolve(__dirname, "frontend", "build", "index.html"));
	});
}

//API and extra

//routes
app.use("/api/answers", answerRoutes);
app.use("/api/exerciseroutines", exerciseroutineRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/routines", routineRoutes);

//other tools to help us laters
app.use(cors());
app.use(json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE, OPTIONS"
	);
	next();
});
