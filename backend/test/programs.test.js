const app = require("../server");
const Program = require("../models/programsModel");
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

test("GET /api/programs", async () => {
	const program = await Program.create({
		userid: "1",
		exerciseid: ["2"],
		routineid: "3",
	});

	await supertest(app)
		.get("/api/programs")
		.expect(200)
		.then((response) => {
			// Check type and length
			expect(Array.isArray(response.body)).toBeTruthy();
			expect(response.body.length).toEqual(1);

			// Check data
			expect(response.body[0]._id).toBe(program.id);
			expect(response.body[0].userid).toBe(program.userid);
			expect(response.body[0].exerciseid).toBe(program.exerciseid);
			expect(response.body[0].routineid).toBe(program.routineid);
		});
});

test("POST /api/programs", async () => {
	const data = {
		userid: "1",
		exerciseid: ["2"],
		routineid: "3",
	};

	await supertest(app)
		.post("/api/programs")
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBeTruthy();
			expect(response.body.userid).toBe(data.userid);
			expect(response.body.exerciseid).toBe(data.exerciseid);
			expect(response.body.routineid).toBe(data.routineid);

			// Check data in the database
			const program = await Program.findOne({ _id: response.body._id });
			expect(program).toBeTruthy();
			expect(program.userid).toBe(data.userid);
			expect(program.exerciseid).toBe(data.exerciseid);
			expect(program.routineid).toBe(data.routineid);
		});
});

test("GET /api/programs/:id", async () => {
	const program = await Program.create({
		userid: "1",
		exerciseid: ["2"],
		routineid: "3",
	});

	await supertest(app)
		.get("/api/programs/" + program.id)
		.expect(200)
		.then((response) => {
			expect(response.body._id).toBe(program.id);
			expect(response.body.userid).toBe(program.userid);
			expect(response.body.exerciseid).toBe(program.exerciseid);
			expect(response.body.routineid).toBe(program.routineid);
		});
});

test("PATCH /api/programs/:id", async () => {
	const program = await Program.create({
		userid: "1",
		exerciseid: ["2"],
		routineid: "3",
	});

	const data = { userid: "1", exerciseid: ["3"], routineid: "4" };

	await supertest(app)
		.patch("/api/programs/" + program.id)
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body._id).toBe(program.id);
			expect(response.body.userid).toBe(data.userid);
			expect(response.body.exerciseid).toBe(data.exerciseid);
			expect(response.body.routineid).toBe(data.routineid);

			// Check the data in the database
			const newProgram = await Program.findOne({ _id: response.body._id });
			expect(newProgram).toBeTruthy();
			expect(newProgram.userid).toBe(data.userid);
			expect(newProgram.exerciseid).toBe(data.exerciseid);
			expect(newProgram.routineid).toBe(data.routineid);
		});
});

test("DELETE /api/programs/:id", async () => {
	const program = await Program.create({
		userid: "1",
		exerciseid: ["2"],
		routineid: "3",
	});

	await supertest(app)
		.delete("/api/programs/" + program.id)
		.expect(204)
		.then(async () => {
			expect(await Program.findOne({ _id: program.id })).toBeFalsy();
		});
});
