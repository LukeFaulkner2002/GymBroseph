const app = require("../server");
const Routine = require("../models/routinesModel");
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

test("GET /api/routines", async () => {
	const routine = await Routine.create({
		routine: [1, 2],
		userid: "1",
	});

	await supertest(app)
		.get("/api/routines")
		.expect(200)
		.then((response) => {
			// Check type and length
			expect(Array.isArray(response.body)).toBeTruthy();
			expect(response.body.length).toEqual(1);

			// Check data
			expect(response.body[0]._id).toBe(routine.id);
			expect(response.body[0].routine).toBe(routine.routine);
			expect(response.body[0].userid).toBe(routine.userid);
		});
});

test("POST /api/routines", async () => {
	const data = { routine: [1, 2], userid: "1" };

	await supertest(app)
		.post("/api/routines")
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBeTruthy();
			expect(response.body.routine).toBe(data.routine);
			expect(response.body.userid).toBe(data.userid);

			// Check data in the database
			const routine = await Routine.findOne({ _id: response.body._id });
			expect(routine).toBeTruthy();
			expect(routine.routine).toBe(data.routine);
			expect(routine.userid).toBe(data.userid);
		});
});

test("GET /api/routines/:id", async () => {
	const routine = await Routine.create({
		routine: [1, 2],
		userid: "1",
	});

	await supertest(app)
		.get("/api/routines/" + routine.id)
		.expect(200)
		.then((response) => {
			expect(response.body._id).toBe(routine.id);
			expect(response.body.routine).toBe(routine.routine);
			expect(response.body.userid).toBe(routine.userid);
		});
});

test("PATCH /api/routines/:id", async () => {
	const routine = await Routine.create({
		routine: [1, 2],
		userid: "1",
	});

	const data = { routine: "New routine", userid: "dolor sit amet" };

	await supertest(app)
		.patch("/api/routines/" + routine.id)
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBe(routine.id);
			expect(response.body.routine).toBe(data.routine);
			expect(response.body.userid).toBe(data.userid);

			// Check the data in the database
			const newRoutine = await Routine.findOne({ _id: response.body._id });
			expect(newRoutine).toBeTruthy();
			expect(newRoutine.routine).toBe(data.routine);
			expect(newRoutine.userid).toBe(data.userid);
		});
});

test("DELETE /api/routines/:id", async () => {
	const routine = await Routine.create({
		routine: [1, 2],
		userid: "1",
	});

	await supertest(app)
		.delete("/api/routines/" + routine.id)
		.expect(204)
		.then(async () => {
			expect(await Routine.findOne({ _id: routine.id })).toBeFalsy();
		});
});
