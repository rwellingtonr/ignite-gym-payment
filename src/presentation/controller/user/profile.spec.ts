import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "~/app"
import request from "supertest"
import { faker } from "@faker-js/faker"

describe("Profile (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})
	afterAll(async () => {
		await app.close()
	})

	it("Should be able to get the user profile", async () => {
		const user = {
			email: faker.internet.email(),
			name: faker.name.fullName(),
			password: faker.lorem.slug(10),
		}
		await request(app.server).post("/api/users").send(user)

		const authResponse = await request(app.server).post("/api/sessions").send({
			email: user.email,
			password: user.password,
		})

		const { token } = authResponse.body

		const response = await request(app.server)
			.get("/api/me")
			.set("Authorization", `Bearer ${token}`)
			.send()

		expect(response.statusCode).toBe(200)
		expect(response.body.user).toEqual(
			expect.objectContaining({ id: expect.any(String), email: user.email }),
		)
	})
})
