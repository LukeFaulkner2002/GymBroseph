const app = require("../server");
const Exercise = require("../models/exercisesModel");
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

test("GET /api/exercises", async () => {
	const exercise = await Exercise.create({
		name: "A",
		musclegroup: "B",
		accessibiility: "C",
		warmupreq: true,
	});

	await supertest(app)
		.get("/api/exercises")
		.expect(200)
		.then((response) => {
			// Check type and length
			expect(Array.isArray(response.body)).toBeTruthy();
			expect(response.body.length).toEqual(1);

			// Check data
			expect(response.body[0]._id).toBe(exercise.id);
			expect(response.body[0].name).toBe(exercise.name);
			expect(response.body[0].musclegroup).toBe(exercise.musclegroup);
			expect(response.body[0].accessibiility).toBe(exercise.accessibiility);
			expect(response.body[0].warmupreq).toBe(exercise.warmupreq);
		});
});

test("POST /api/exercises", async () => {
	const data = {
		name: "A",
		musclegroup: "B",
		accessibiility: "C",
		warmupreq: true,
	};

	await supertest(app)
		.post("/api/exercises")
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBeTruthy();
			expect(response.body.name).toBe(data.name);
			expect(response.body.musclegroup).toBe(data.musclegroup);
			expect(response.body.accessibiility).toBe(data.accessibiility);
			expect(response.body.warmupreq).toBe(data.warmupreq);

			// Check data in the database
			const exercise = await Exercise.findOne({ _id: response.body._id });
			expect(exercise).toBeTruthy();
			expect(exercise.name).toBe(data.name);
			expect(exercise.musclegroup).toBe(data.musclegroup);
			expect(exercise.accessibiility).toBe(data.accessibiility);
			expect(exercise.warmupreq).toBe(data.warmupreq);
		});
});

test("GET /api/exercises/:id", async () => {
	const exercise = await Exercise.create({
		name: "A",
		musclegroup: "B",
		accessibiility: "C",
		warmupreq: true,
	});

	await supertest(app)
		.get("/api/exercises/" + exercise.id)
		.expect(200)
		.then((response) => {
			expect(response.body._id).toBe(exercise.id);
			expect(response.body.name).toBe(exercise.name);
			expect(response.body.musclegroup).toBe(exercise.musclegroup);
			expect(response.body.accessibiility).toBe(exercise.accessibiility);
			expect(response.body.warmupreq).toBe(exercise.warmupreq);
		});
});

test("PATCH /api/exercises/:id", async () => {
	const exercise = await Exercise.create({
		name: "A",
		musclegroup: "B",
		accessibiility: "C",
		warmupreq: true,
	});

	const data = {
		name: "D",
		musclegroup: "E",
		accessibiility: "F",
		warmupreq: true,
	};

	await supertest(app)
		.patch("/api/exercises/" + exercise.id)
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBe(exercise.id);
			expect(response.body.name).toBe(data.name);
			expect(response.body.musclegroup).toBe(data.musclegroup);
			expect(response.body.accessibiility).toBe(data.accessibiility);
			expect(response.body.warmupreq).toBe(data.warmupreq);

			// Check the data in the database
			const newExercise = await Exercise.findOne({ _id: response.body._id });
			expect(newExercise).toBeTruthy();
			expect(newExercise.name).toBe(data.name);
			expect(newExercise.musclegroup).toBe(data.musclegroup);
			expect(newExercise.accessibiility).toBe(data.accessibiility);
			expect(newExercise.warmupreq).toBe(data.warmupreq);
		});
});

test("DELETE /api/exercises/:id", async () => {
	const exercise = await Exercise.create({
		name: "A",
		musclegroup: "B",
		accessibiility: "C",
		warmupreq: true,
	});

	await supertest(app)
		.delete("/api/exercises/" + exercise.id)
		.expect(204)
		.then(async () => {
			expect(await Exercise.findOne({ _id: exercise.id })).toBeFalsy();
		});
});
