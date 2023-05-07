import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { app } from "~/app"
import request from "supertest"
import { createAndAuthUser } from "~/utils/test/createAndAuthUser"

describe("Profile (e2e)", () => {
	beforeAll(async () => {
		await app.ready()
	})
	afterAll(async () => {
		await app.close()
	})

	it("Should be able to get the user profile", async () => {
		const { token, user } = await createAndAuthUser()

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
