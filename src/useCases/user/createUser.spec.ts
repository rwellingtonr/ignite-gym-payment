import { beforeEach, describe, expect, it } from "vitest"
import { CreateUserService } from "./createUser"
import { comparePassword } from "~/helpers/bcryptjs"
import { faker } from "@faker-js/faker"
import { UserInMemoryRepository } from "~/infra/repository/in-memory/userRepositoryInMemory"

describe("Create User", () => {
	let createUserService: CreateUserService

	beforeEach(() => {
		createUserService = new CreateUserService(new UserInMemoryRepository())
	})

	it("Should create an user", async () => {
		const input = {
			email: faker.internet.email(),
			name: faker.name.fullName(),
			password: faker.lorem.word({ length: 8 }),
		}

		const response = await createUserService.execute(input)
		expect(response?.user).toHaveProperty("id")
		expect(response.user.createdAt).toEqual(expect.any(Date))
	})
	it("Should hash the user password", async () => {
		const input = {
			email: faker.internet.email(),
			name: faker.name.fullName(),
			password: faker.lorem.word({ length: 8 }),
		}

		const response = await createUserService.execute(input)

		const isPasswordHashed = await comparePassword(input.password, response.user.password)

		expect(isPasswordHashed).toBeTruthy()
	})
	it("Should not be able to create the same user twice", async () => {
		const input = {
			email: faker.internet.email(),
			name: faker.name.fullName(),
			password: faker.lorem.word({ length: 8 }),
		}

		await createUserService.execute(input)

		await expect(() => createUserService.execute(input)).rejects.toThrowError(
			/This user already exists!/,
		)
	})
})
