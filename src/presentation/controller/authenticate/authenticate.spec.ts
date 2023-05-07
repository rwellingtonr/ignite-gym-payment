import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "~/app"
import request from "supertest"
import { faker } from "@faker-js/faker"

describe("Authenticate (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})
	afterAll(async () => {
		await app.close()
	})

	it("Should be able to authenticate the user", async () => {
		const user = {
			email: faker.internet.email(),
			name: faker.name.fullName(),
			password: faker.lorem.slug(10),
		}
		await request(app.server).post("/api/users").send(user)

		const response = await request(app.server).post("/api/sessions").send({
			email: user.email,
			password: user.password,
		})

		expect(response.statusCode).toBe(200)
		expect(response.body).toEqual(expect.objectContaining({ token: expect.any(String) }))
	})
})
