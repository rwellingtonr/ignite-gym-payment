import { afterEach, beforeEach, describe, it, expect, vi } from "vitest"
import { IGymRepository } from "~/infra/repository/gym/interface"
import { GymInMemoryRepository } from "~/infra/repository/in-memory/gymInMemoryRepository"
import { faker } from "@faker-js/faker"
import { SearchGymService } from "./searchGymService"
import { randomUUID } from "crypto"

describe("Search Gyms Service", () => {
	let gymRepository: IGymRepository
	let sut: SearchGymService

	beforeEach(() => {
		gymRepository = new GymInMemoryRepository()
		sut = new SearchGymService(gymRepository)
		vi.useFakeTimers()
		gymRepository.create({
			id: "gym-id",
			latitude: 0,
			longitude: 0,
			title: faker.lorem.slug(),
			description: faker.lorem.paragraph(),
			phone: faker.phone.number(),
		})
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it("Should be able to search some gyms", async () => {
		vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
		const gymMock = {
			id: randomUUID(),
			latitude: 0,
			longitude: 0,
			title: faker.lorem.slug(),
			description: faker.lorem.paragraph(),
			phone: faker.phone.number(),
		}

		await gymRepository.create(gymMock)
		const { gyms } = await sut.execute({
			page: 1,
			query: gymMock.title,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ id: gymMock.id })])
	})
	it("Should be able to fetch the second page of gyms result", async () => {
		vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))
		const baseTitle = faker.lorem.slug()
		for (let index = 0; index < 23; index++) {
			await gymRepository.create({
				id: randomUUID(),
				latitude: index,
				longitude: index,
				title: `${baseTitle}-${index}`,
				description: faker.lorem.sentence(),
				phone: faker.phone.number(),
			})
		}

		const { gyms } = await sut.execute({ query: baseTitle, page: 2 })

		expect(gyms).toHaveLength(3)
		expect(gyms).toEqual([
			expect.objectContaining({ title: `${baseTitle}-20` }),
			expect.objectContaining({ title: `${baseTitle}-21` }),
			expect.objectContaining({ title: `${baseTitle}-22` }),
		])
	})
})
