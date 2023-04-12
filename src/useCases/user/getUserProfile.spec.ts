import { beforeEach, describe, expect, it } from "vitest"

import { UserInMemoryRepository } from "~/infra/repository/in-memory/userRepositoryInMemory"
import { IUserRepository } from "~/infra/repository/user/interface"
import { faker } from "@faker-js/faker"
import { hashPassword } from "~/helpers/bcryptjs"
import { GetUserProfileService } from "./getUserProfile"

describe("Get user Profile Use Case", () => {
	let sut: GetUserProfileService
	let repository: IUserRepository

	beforeEach(() => {
		repository = new UserInMemoryRepository()
		sut = new GetUserProfileService(repository)
	})

	it("Should find an user", async () => {
		const userProps = {
			email: faker.internet.email(),
			name: faker.name.firstName(),
			passwordHash: faker.address.city(),
			createdAt: new Date(),
		}

		const response = await repository.create({
			...userProps,
			passwordHash: await hashPassword(userProps.passwordHash),
		})

		const { user } = await sut.execute({ id: response.id })

		expect(user.email).toBe(userProps.email)
	})
	it("Should be able to find user by wrong id", async () => {
		await expect(() => sut.execute({ id: faker.color.human() })).rejects.toThrowError(
			/Could not find this user/,
		)
	})
})
