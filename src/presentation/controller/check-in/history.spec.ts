import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "~/app"
import request from "supertest"
import { createAndAuthUser } from "~/utils/test/createAndAuthUser"
import { faker } from "@faker-js/faker"
import { prisma } from "~/infra/database"

describe("History Check-In (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})
	afterAll(async () => {
		await app.close()
	})

	it("Should be able to list the check-ins", async () => {
		const { token, user } = await createAndAuthUser()
		const gymResponse = await request(app.server)
			.post("/api/gym")
			.set("Authorization", `Bearer ${token}`)
			.send({
				description: faker.lorem.lines(1),
				latitude: -20.8274,
				longitude: -49.12398,
				phone: faker.phone.number("(##) # ####-####"),
				title: faker.lorem.slug(3),
			})

		await prisma.checkIn.createMany({
			data: [
				{
					gymId: gymResponse.body.gym.id,
					userId: user.id,
				},
				{
					gymId: gymResponse.body.gym.id,
					userId: user.id,
				},
				{
					gymId: gymResponse.body.gym.id,
					userId: user.id,
				},
			],
		})

		const response = await request(app.server)
			.get("/api/check-in/history")
			.query({
				page: 1,
			})
			.set("Authorization", `Bearer ${token}`)
			.send()

		expect(response.statusCode).toBe(200)
		expect(response.body.checkIn).toHaveLength(3)
	})
})
