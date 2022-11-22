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
		programid: "1",
		numberofdays: 2,
		numberofexercises: 3,
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
			expect(response.body[0].programid).toBe(routine.programid);
			expect(response.body[0].numberofdays).toBe(routine.numberofdays);
			expect(response.body[0].numberofexercises).toBe(
				routine.numberofexercises
			);
		});
});

test("POST /api/routines", async () => {
	const data = {
		programid: "1",
		numberofdays: 2,
		numberofexercises: 3,
	};

	await supertest(app)
		.post("/api/routines")
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBeTruthy();
			expect(response.body.programid).toBe(data.programid);
			expect(response.body.numberofdays).toBe(data.numberofdays);
			expect(response.body.numberofexercises).toBe(data.numberofexercises);

			// Check data in the database
			const routine = await Routine.findOne({ _id: response.body._id });
			expect(routine).toBeTruthy();
			expect(routine.programid).toBe(data.programid);
			expect(routine.numberofdays).toBe(data.numberofdays);
			expect(routine.numberofexercises).toBe(data.numberofexercises);
		});
});

test("GET /api/routines/:id", async () => {
	const routine = await Routine.create({
		programid: "1",
		numberofdays: 2,
		numberofexercises: 3,
	});

	await supertest(app)
		.get("/api/routines/" + routine.id)
		.expect(200)
		.then((response) => {
			expect(response.body._id).toBe(routine.id);
			expect(response.body.programid).toBe(routine.programid);
			expect(response.body.numberofdays).toBe(routine.numberofdays);
			expect(response.body.numberofexercises).toBe(routine.numberofexercises);
		});
});

test("PATCH /api/routines/:id", async () => {
	const routine = await Routine.create({
		programid: "1",
		numberofdays: 2,
		numberofexercises: 3,
	});

	const data = { programid: "1", numberofdays: [3], numberofexercises: "4" };

	await supertest(app)
		.patch("/api/routines/" + routine.id)
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBe(routine.id);
			expect(response.body.programid).toBe(data.programid);
			expect(response.body.numberofdays).toBe(data.numberofdays);
			expect(response.body.numberofexercises).toBe(data.numberofexercises);

			// Check the data in the database
			const newRoutine = await Routine.findOne({ _id: response.body._id });
			expect(newRoutine).toBeTruthy();
			expect(newRoutine.programid).toBe(data.programid);
			expect(newRoutine.numberofdays).toBe(data.numberofdays);
			expect(newRoutine.numberofexercises).toBe(data.numberofexercises);
		});
});

test("DELETE /api/routines/:id", async () => {
	const routine = await Routine.create({
		programid: "1",
		numberofdays: 2,
		numberofexercises: 3,
	});

	await supertest(app)
		.delete("/api/routines/" + routine.id)
		.expect(204)
		.then(async () => {
			expect(await Routine.findOne({ _id: routine.id })).toBeFalsy();
		});
});
