import { faker } from "@faker-js/faker"
import request from "supertest"
import { app } from "~/app"

export const createAndAuthUser = async () => {
	const userProps = {
		email: faker.internet.email(),
		name: faker.name.fullName(),
		password: faker.lorem.slug(10),
	}
	await request(app.server).post("/api/users").send(userProps)

	const authResponse = await request(app.server).post("/api/sessions").send({
		email: userProps.email,
		password: userProps.password,
	})

	const { token, user } = authResponse.body

	return {
		token,
		user,
	}
}
