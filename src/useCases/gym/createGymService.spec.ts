import { describe, beforeEach, it, expect } from "vitest"
import { IGymRepository } from "~/infra/repository/gym/interface"
import { CreateGymService } from "./createGymService"
import { GymInMemoryRepository } from "~/infra/repository/in-memory/gymInMemoryRepository"
import { faker } from "@faker-js/faker"

describe("Create gym use case", () => {
	let repository: IGymRepository
	let sut: CreateGymService

	beforeEach(() => {
		repository = new GymInMemoryRepository()
		sut = new CreateGymService(repository)
	})

	it("Should be able to create a gym", async () => {
		const { gym } = await sut.execute({
			description: faker.lorem.sentence(),
			latitude: -23.050076,
			longitude: -46.875178,
			title: faker.lorem.slug(),
			phone: faker.phone.number(),
		})

		expect(gym.id).toEqual(expect.any(String))
	})
})
