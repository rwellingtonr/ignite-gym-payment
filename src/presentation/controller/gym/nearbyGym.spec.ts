import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "~/app"
import request from "supertest"
import { createAndAuthUser } from "~/utils/test/createAndAuthUser"
import { faker } from "@faker-js/faker"

const user = {
	latitude: -23.0370522,
	longitude: -46.9744409,
}

const closerGym = {
	latitude: -23.0370522,
	longitude: -46.9744409,
}

const farawayGym = {
	latitude: -22.9,
	longitude: -47.0132744,
}

describe("Get Nearby Gym (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})
	afterAll(async () => {
		await app.close()
	})

	it("Should be able return a gym nearby from the user", async () => {
		const { token } = await createAndAuthUser()

		await Promise.all([
			request(app.server)
				.post("/api/gym")
				.set("Authorization", `Bearer ${token}`)
				.send({
					description: faker.lorem.lines(1),
					latitude: closerGym.latitude,
					longitude: closerGym.longitude,
					phone: faker.phone.number("(##) # ####-####"),
					title: "Closer",
				}),
			request(app.server)
				.post("/api/gym")
				.set("Authorization", `Bearer ${token}`)
				.send({
					description: faker.lorem.lines(1),
					latitude: farawayGym.latitude,
					longitude: farawayGym.longitude,
					phone: faker.phone.number("(##) # ####-####"),
					title: "Faraway",
				}),
		])

		const response = await request(app.server)
			.get("/api/gym/nearby")
			.query({
				latitude: user.latitude,
				longitude: user.longitude,
			})
			.set("Authorization", `Bearer ${token}`)
			.send()

		expect(response.statusCode).toBe(200)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: "Closer",
			}),
		])
	})
})
