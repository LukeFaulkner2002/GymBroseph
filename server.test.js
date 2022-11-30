const request = require("supertest");
const app = require("./server");

beforeAll((done) => {
	done();
});

afterAll((done) => {
	done();
});

describe("Api Super tests", () => {
	it("tests /register endpoint", async () => {
		const newRegister = {
			firstName: "John",
			lastName: "Doe",
			login: "JohnDoe123",
			password: "JDpassword123",
			email: "John.doe@gmail.com",
		};
		// afterAll(async () => {
		// 	await request(app).delete(`/todo/${newTodo.id}`);
		// });
		const response = await request(app).post("/api/register").send(newRegister);
		expect(response.body).toEqual({ error: "" });
		expect(response.statusCode).toBe(200);
	});
	it("tests /replaceExercise endpoints", async () => {
		const newExercise = {
			_id: "637d5b5a319d03a7e50335f5",
			routineNum: 1,
			routineIndex: 1,
			newExerciseId: "636b4024dbe4388e667522f2",
		};
		const response = await request(app).post("/api/replaceExercise").send(newExercise);
		expect(response.body);
		expect(response.statusCode).toBe(200);
	});
	it("tests /login endpoints", async () => {
		const newLogin = {
			login: "JohnDoe123",
			password: "JDpassword123",
		};
		const response = await request(app).post("/api/login").send(newLogin);
		expect(response.body).toEqual({
			error: "",
			firstName: "John",
			id: "638749ba0751f0ee8c19b345",
			lastName: "Doe",
		});
		expect(response.statusCode).toBe(200);
	});
	it("tests /searchExercises endpoints", async () => {
		const newSearch = {
			searchText: "Push Up",
			equipment: "Commercial Gym",
			muscleGroup: "Chest",
			warmUpReq: "Y",
			pageNum: 0,
		};
		const response = await request(app).post("/api/searchExercises").send(newSearch);
		expect(response.body).toEqual({ results: [] });
		expect(response.statusCode).toBe(200);
	});
	it("tests /resetPassword endpoints", async () => {
		const newRequest = {
			email: "john.doe@gmail.com",
		};
		const response = await request(app).post("/api/resetPassword").send(newRequest);
		expect(response.body).toEqual({
			results: {
				acknowledged: true,
				matchedCount: 0,
				modifiedCount: 0,
				upsertedCount: 0,
				upsertedId: null,
			},
		});
		expect(response.statusCode).toBe(200);
	});
	it("tests /changePassword endpoints", async () => {
		const newPassword = {
			_id: "637d5b5a319d03a7e50335f5",
			oldPassword: "oldpassword123",
			newPassword: "newpassword123",
		};
		const response = await request(app).post("/api/changePassword").send(newPassword);
		expect(response.body).toEqual({
			results: {
				acknowledged: true,
				matchedCount: 0,
				modifiedCount: 0,
				upsertedCount: 0,
				upsertedId: null,
			},
		});
		expect(response.statusCode).toBe(200);
	});
	it("tests /populateTable endpoints", async () => {
		const id = {
			_id: "637d5b5a319d03a7e50335f5",
		};
		const response = await request(app).post("/api/populateTable").send(id);
		expect(response.body).toEqual({
			results: [
				[
					null,
					{
						Accessibility: "Community Gym",
						ExerciseName: "Single-Arm Cable Kick-Back",
						MuscleGroup: "Triceps",
						WarmUpReq: "N",
						_id: "636b4024dbe4388e667522f2",
					},
				],
				[],
			],
		});
		expect(response.statusCode).toBe(200);
	});
	it("tests /autoFillRoutines endpoints", async () => {
		const newQuery = {
			equipment: "Commercial Gym",
			time: "Y",
			muscleGroup: "Chest",
			_id: "637d5b5a319d03a7e50335f5",
		};
		const response = await request(app).post("/api/autoFillRoutines").send(newQuery);
		expect(response.body).toEqual({
			results: {
				acknowledged: true,
				matchedCount: 1,
				modifiedCount: 1,
				upsertedCount: 0,
				upsertedId: null,
			},
		});
		expect(response.statusCode).toBe(200);
	});
});
