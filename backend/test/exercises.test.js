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
		exercise: [1, 2],
		userid: "1",
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
			expect(response.body[0].exercise).toBe(exercise.exercise);
			expect(response.body[0].userid).toBe(exercise.userid);
		});
});

test("POST /api/exercises", async () => {
	const data = { exercise: [1, 2], userid: "1" };

	await supertest(app)
		.post("/api/exercises")
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBeTruthy();
			expect(response.body.exercise).toBe(data.exercise);
			expect(response.body.userid).toBe(data.userid);

			// Check data in the database
			const exercise = await Exercise.findOne({ _id: response.body._id });
			expect(exercise).toBeTruthy();
			expect(exercise.exercise).toBe(data.exercise);
			expect(exercise.userid).toBe(data.userid);
		});
});

test("GET /api/exercises/:id", async () => {
	const exercise = await Exercise.create({
		exercise: [1, 2],
		userid: "1",
	});

	await supertest(app)
		.get("/api/exercises/" + exercise.id)
		.expect(200)
		.then((response) => {
			expect(response.body._id).toBe(exercise.id);
			expect(response.body.exercise).toBe(exercise.exercise);
			expect(response.body.userid).toBe(exercise.userid);
		});
});

test("PATCH /api/exercises/:id", async () => {
	const exercise = await Exercise.create({
		exercise: [1, 2],
		userid: "1",
	});

	const data = { exercise: "New exercise", userid: "1" };

	await supertest(app)
		.patch("/api/exercises/" + exercise.id)
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBe(exercise.id);
			expect(response.body.exercise).toBe(data.exercise);
			expect(response.body.userid).toBe(data.userid);

			// Check the data in the database
			const newExercise = await Exercise.findOne({ _id: response.body._id });
			expect(newExercise).toBeTruthy();
			expect(newExercise.exercise).toBe(data.exercise);
			expect(newExercise.userid).toBe(data.userid);
		});
});

test("DELETE /api/exercises/:id", async () => {
	const exercise = await Exercise.create({
		exercise: [1, 2],
		userid: "1",
	});

	await supertest(app)
		.delete("/api/exercises/" + exercise.id)
		.expect(204)
		.then(async () => {
			expect(await Exercise.findOne({ _id: exercise.id })).toBeFalsy();
		});
});
