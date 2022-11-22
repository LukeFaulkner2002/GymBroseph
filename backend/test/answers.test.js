const app = require("../server");
const Answer = require("../models/answersModel");
const mongoose = require("mongoose");
const supertest = require("supertest");

require("dotenv").config;

//Connects and Disconnects the database
beforeEach((done) => {
	mongoose.connect(
		process.env.MONGODB_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => done()
	);
});

afterEach((done) => {
	mongoose.connection.db
		.dropDatabase()
		.then(mongoose.connection.close(() => done()));
});

test("GET /api/answers", async () => {
	const answer = await Answer.create({
		answer: [1, 2],
		userid: "1",
	});

	await supertest(app)
		.get("/api/answers")
		.expect(200)
		.then((response) => {
			// Check type and length
			expect(Array.isArray(response.body)).toBeTruthy();
			expect(response.body.length).toEqual(1);

			// Check data
			expect(response.body[0]._id).toBe(answer.id);
			expect(response.body[0].answer).toBe(answer.answer);
			expect(response.body[0].userid).toBe(answer.userid);
		});
});

test("POST /api/answers", async () => {
	const data = { answer: [1, 2], userid: "1" };

	await supertest(app)
		.post("/api/answers")
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBeTruthy();
			expect(response.body.answer).toBe(data.answer);
			expect(response.body.userid).toBe(data.userid);

			// Check data in the database
			const answer = await Answer.findOne({ _id: response.body._id });
			expect(answer).toBeTruthy();
			expect(answer.answer).toBe(data.answer);
			expect(answer.userid).toBe(data.userid);
		});
});

test("GET /api/answers/:id", async () => {
	const answer = await Answer.create({
		answer: [1, 2],
		userid: "1",
	});

	await supertest(app)
		.get("/api/answers/" + answer.id)
		.expect(200)
		.then((response) => {
			expect(response.body._id).toBe(answer.id);
			expect(response.body.answer).toBe(answer.answer);
			expect(response.body.userid).toBe(answer.userid);
		});
});

test("PATCH /api/answers/:id", async () => {
	const answer = await Answer.create({
		answer: [1, 2],
		userid: "1",
	});

	const data = { answer: "New answer", userid: "1" };

	await supertest(app)
		.patch("/api/answers/" + answer.id)
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBe(answer.id);
			expect(response.body.answer).toBe(data.answer);
			expect(response.body.userid).toBe(data.userid);

			// Check the data in the database
			const newAnswer = await Answer.findOne({ _id: response.body._id });
			expect(newAnswer).toBeTruthy();
			expect(newAnswer.answer).toBe(data.answer);
			expect(newAnswer.userid).toBe(data.userid);
		});
});

test("DELETE /api/answers/:id", async () => {
	const answer = await Answer.create({
		answer: [1, 2],
		userid: "1",
	});

	await supertest(app)
		.delete("/api/answers/" + answer.id)
		.expect(204)
		.then(async () => {
			expect(await Answer.findOne({ _id: answer.id })).toBeFalsy();
		});
});
