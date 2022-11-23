const app = require("../server");
const User = require("../models/usersModel");
const mongoose = require("mongoose");
const supertest = require("supertest");
const blueimp = require("blueimp-md5");
const usersModel = require("../models/usersModel");

require("dotenv").config;
//Register
test("POST /api/register", async () => {
	const data = {
		id: "1",
		firstName: "Jon",
		lastName: "Snow",
		login: "SnowBro",
		password: "SnowBro",
		email: "zackkiener@yahoo.com",
		confirmed: false,
	};

	await supertest(app)
		.post("/api/register")
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBe(answer.id);
			expect(response.body.firstName).toBe(data.firstName);
			expect(response.body.lastName).toBe(data.lastName);
			expect(response.body.login).toBe(data.login);
			expect(response.body.password).toBe(blueimp(data.password));
			expect(response.body.email).toBe(data.email);
			expect(response.body.confirmed).toBe(data.confirmed);

			// Check the data in the database
			const newUser = await User.findOne({ _id: response.body._id });
			expect(newUser).toBeTruthy();
			expect(newUser.firstName).toBe(data.firstName);
			expect(newUser.lastName).toBe(data.lastName);
			expect(newUser.login).toBe(data.login);
			expect(newUser.password).toBe(blueimp(data.password));
			expect(newUser.email).toBe(data.email);
			expect(newUser.confirmed).toBe(data.confirmed);
		});
});
//Login
test("POST /api/login", async () => {
	const data = {
		id: "1",
		firstName: "Jon",
		lastName: "Snow",
		login: "SnowBro",
		password: blueimp("SnowBro"),
		email: "zackkiener@yahoo.com",
		confirmed: false,
	};

	await supertest(app)
		.post("/api/login")
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body.login).toBe(data.login);
			expect(response.body.password).toBe(blueimp(data.password));

			// Check the data in the database
			const newUser = await User.findOne({ _id: response.body._id });
			expect(newUser).toBeTruthy();
			expect(newUser.firstName).toBe(data.firstName);
			expect(newUser.lastName).toBe(data.lastName);
			expect(newUser.login).toBe(data.login);
			expect(newUser.password).toBe(blueimp(data.password));
			expect(newUser.email).toBe(data.email);
			expect(newUser.confirmed).toBe(data.confirmed);
		});
});

//Edit User
test("PATCH /api/verification/:id", async () => {
	const user = await User.create({
		firstName: "Jon",
		lastName: "Snow",
		login: "SnowBro",
		password: "SnowBro",
		email: "zackkiener@yahoo.com",
		confirmed: false,
	});

	const data = {
		firstName: "Aegon",
		lastName: "Targaryon",
		login: "SnowBro",
		password: "SnowBro",
		email: "zackkiener@yahoo.com",
		confirmed: true,
	};

	await supertest(app)
		.patch("/api/verification" + user.id)
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBe(answer.id);
			expect(response.body.firstName).toBe(data.firstName);
			expect(response.body.lastName).toBe(data.lastName);
			expect(response.body.login).toBe(data.login);
			expect(response.body.password).toBe(blueimp(data.password));
			expect(response.body.email).toBe(data.email);
			expect(response.body.confirmed).toBe(data.confirmed);

			// Check the data in the database
			const newUser = await User.findOne({ _id: response.body._id });
			expect(newUser).toBeTruthy();
			expect(newUser.firstName).toBe(data.firstName);
			expect(newUser.lastName).toBe(data.lastName);
			expect(newUser.login).toBe(data.login);
			expect(newUser.password).toBe(blueimp(data.password));
			expect(newUser.email).toBe(data.email);
			expect(newUser.confirmed).toBe(data.confirmed);
		});
});

//Delete User
// test("DELETE /api/verification/:id", async () => {
// 	const data = {
// 		id: "1",
// 		firstName: "Jon",
// 		lastName: "Snow",
// 		login: "SnowBro",
// 		password: "SnowBro",
// 		email: "zackkiener@yahoo.com",
// 		confirmed: false,
// 	};

// 	await supertest(app)
// 		.delete("/api/verification/" + answer.id)
// 		.expect(204)
// 		.then(async () => {
// 			expect(await Answer.findOne({ _id: answer.id })).toBeFalsy();
// 		});
// });
