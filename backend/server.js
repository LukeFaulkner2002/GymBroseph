//Required stuff
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
var blueimp = require("blueimp-md5");
const nodemailer = require("nodemailer");

//import routes
const indexRoutes = require("./routes/index");
const answerRoutes = require("./routes/answers");
const programRoutes = require("./routes/programs");
const exerciseRoutes = require("./routes/exercises");
const routineRoutes = require("./routes/routines");

const PORT = process.env.PORT || 5000;
const app = express();
app.set("port", process.env.PORT || 5000);

//MongoDB stuff
require("dotenv").config();
const url = process.env.MONGODB_URI;
mongoose
	.connect(url)
	.then(() => {
		console.log("connected to database");
		app.listen(process.env.PORT, () => {
			console.log("listening for requests on port", process.env.PORT);
		});
	})
	.catch((err) => {
		console.log(err);
	});

//Set up production env
if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));
	app.get("*", (req, res) => {
		res.sendFile(resolve(__dirname, "frontend", "build", "index.html"));
	});
}

//API and extra

app.use(cors());
app.use(bodyParser.json());
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

//routes
app.use("/api", indexRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/routines", routineRoutes);

//Error handling
process
	.on("uncaughtException", function (err) {
		console.log("uncaught exception", err);
	})
	.on("unhandledRejection", (reason, p) => {
		console.log("unhandledRejections reason", reason);
	})
	.on("warning", (warning) => {
		console.log(`warning, ... ${warning}`);
	});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(404).send("Not Found");
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

module.exports = app;
