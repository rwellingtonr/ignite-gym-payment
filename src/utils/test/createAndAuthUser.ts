import { faker } from "@faker-js/faker"
import request from "supertest"
import { app } from "~/app"

export const createAndAuthUser = async () => {
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

	return {
		token,
		user,
	}
}
