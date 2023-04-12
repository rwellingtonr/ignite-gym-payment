import { beforeEach, describe, expect, it } from "vitest"
import { AuthenticateService } from "./authenticate"
import { UserInMemoryRepository } from "~/infra/repository/in-memory/userRepositoryInMemory"
import { IUserRepository } from "~/infra/repository/user/interface"
import { faker } from "@faker-js/faker"
import { hashPassword } from "~/helpers/bcryptjs"

describe("Authenticate Use Case", () => {
	let sut: AuthenticateService
	let repository: IUserRepository

	beforeEach(() => {
		repository = new UserInMemoryRepository()
		sut = new AuthenticateService(repository)
	})

	it("Should authenticate an user", async () => {
		const userProps = {
			email: faker.internet.email(),
			name: faker.name.firstName(),
			passwordHash: faker.address.city(),
			createdAt: new Date(),
		}

		await repository.create({
			...userProps,
			passwordHash: await hashPassword(userProps.passwordHash),
		})

		const { user } = await sut.execute({ email: userProps.email, password: userProps.passwordHash })

		expect(user.email).toBe(userProps.email)
	})
	it("Should not valide with invalid email", async () => {
		await expect(() =>
			sut.execute({ email: faker.internet.email(), password: "12sdf2" }),
		).rejects.toThrowError(/Could not find this user/)
	})
	it("Should not validate with wrong credentials", async () => {
		const userProps = {
			email: faker.internet.email(),
			name: faker.name.firstName(),
			passwordHash: faker.address.city(),
			createdAt: new Date(),
		}

		await repository.create({
			...userProps,
			passwordHash: await hashPassword(userProps.passwordHash),
		})
		await expect(() =>
			sut.execute({ email: userProps.email, password: "12sdf2" }),
		).rejects.toThrowError(/Invalid credentials/)
	})
})
