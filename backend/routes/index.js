const express = require("express");
const {
	createUser,
	loginUser,
	verifyEmail,
	updateUser,
} = require("../controllers/indexController");

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/verification", verifyEmail);

router.patch("/verification/:id", updateUser);

module.exports = router;
