const request = require("supertest");
const app = require("server.js");

describe("Api Super tests", () => {
	it("tests /register endpoint", async () => {
		const newRegister = {
			firstName: "John",
			lastName: "Doe",
			login: "JohnDoe123",
			password: "JDpassword123",
			email: "John.doe@gmail.com",
		};

		const response = await request(app).post("/api/register");
		expect(response.body).toEqual();
		expect(response.body).toHaveLength(0);
		expect(response.statusCode).toBe(200);
	});
	it("tests /replaceExercise endpoints", async () => {
		const newExercise = {
			_id: "637d5b5a319d03a7e50335f5",
			routineNum: 1,
			routineIndex: 1,
			newExerciseId: "636b4024dbe4388e667522f2",
		};
		const response = await request(app).post("/api/replaceExercise");
		expect(response.body).toHaveLength(0);
		expect(response.statusCode).toBe(200);
	});
	it("tests /login endpoints", async () => {
		const newLogin = {
			login: "JohnDoe123",
			password: "JDpassword123",
		};
		const response = await request(app).post("/api/login");
		expect(response.body).toEqual({
			id: "string",
			firstname: "string",
			lastname: "string",
			error: "string",
		});
		expect(response.body).toHaveLength(4);
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
		const response = await request(app).post("/api/searchExercises");
		expect(response.body).toHaveLength(0);
		expect(response.statusCode).toBe(200);
	});
	it("tests /resetPassword endpoints", async () => {
		const newRequest = {
			email: "john.doe@gmail.com",
		};
		const response = await request(app).post("/api/resetPassword");
		expect(response.body).toHaveLength(0);
		expect(response.statusCode).toBe(200);
	});
	it("tests /changePassword endpoints", async () => {
		const newPassword = {
			_id: "637d5b5a319d03a7e50335f5",
			oldPassword: "oldpassword123",
			newPassword: "newpassword123",
		};
		const response = await request(app).post("/api/changePassword");
		expect(response.body).toHaveLength(0);
		expect(response.statusCode).toBe(200);
	});
	it("tests /populateTable endpoints", async () => {
		const newPassword = {
			_id: "637d5b5a319d03a7e50335f5",
		};
		const response = await request(app).post("/api/populateTable");
		expect(response.body).toHaveLength(0);
		expect(response.statusCode).toBe(200);
	});
	it("tests /autoFillRoutines endpoints", async () => {
		const newPassword = {
			equipment: "Commercial Gym",
			time: "Y",
			muscleGroup: "Chest",
			_id: "637d5b5a319d03a7e50335f5",
		};
		const response = await request(app).post("/api/autoFillRoutines");
		expect(response.body).toHaveLength(0);
		expect(response.statusCode).toBe(200);
	});
});
