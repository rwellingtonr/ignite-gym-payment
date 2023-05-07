import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "~/app"
import request from "supertest"
import { createAndAuthUser } from "~/utils/test/createAndAuthUser"
import { faker } from "@faker-js/faker"

describe("Create Gym (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})
	afterAll(async () => {
		await app.close()
	})

	it("Should be able create a gym", async () => {
		const { token } = await createAndAuthUser()

		const response = await request(app.server)
			.post("/api/gym")
			.set("Authorization", `Bearer ${token}`)
			.send({
				description: faker.lorem.lines(1),
				latitude: -20.8274,
				longitude: -49.12398,
				phone: faker.phone.number("(##) # ####-####"),
				title: faker.lorem.slug(3),
			})

		expect(response.statusCode).toBe(201)
		expect(response.body.gym).toEqual(expect.objectContaining({ id: expect.any(String) }))
	})
})
