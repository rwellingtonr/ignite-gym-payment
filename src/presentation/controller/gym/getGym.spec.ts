import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "~/app"
import request from "supertest"
import { createAndAuthUser } from "~/utils/test/createAndAuthUser"
import { faker } from "@faker-js/faker"

describe("Get Gym (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})
	afterAll(async () => {
		await app.close()
	})

	it("Should be able search for a gym", async () => {
		const { token } = await createAndAuthUser()

		const gymProps = {
			description: faker.lorem.lines(1),
			latitude: -20.8274,
			longitude: -49.12398,
			phone: faker.phone.number("(##) # ####-####"),
			title: faker.lorem.slug(1),
		}

		await request(app.server)
			.post("/api/gym")
			.set("Authorization", `Bearer ${token}`)
			.send(gymProps)

		const response = await request(app.server)
			.get("/api/gym/search")
			.query({
				q: gymProps.title,
			})
			.set("Authorization", `Bearer ${token}`)
			.send()

		expect(response.statusCode).toBe(200)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: gymProps.title,
			}),
		])
	})
})
