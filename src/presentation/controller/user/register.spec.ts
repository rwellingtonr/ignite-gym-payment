import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "~/app"
import request from "supertest"
import { faker } from "@faker-js/faker"

describe("Register (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})
	afterAll(async () => {
		await app.close()
	})

	it("Should be able to register an user", async () => {
		const response = await request(app.server)
			.post("/api/users")
			.send({
				email: faker.internet.email(),
				name: faker.name.fullName(),
				password: faker.lorem.slug(10),
			})

		expect(response.statusCode).toBe(201)
	})
})
