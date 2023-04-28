import { beforeEach, describe, it, expect, vi, afterEach } from "vitest"
import { IGymRepository } from "~/infra/repository/gym/interface"
import { GetNearbyGymService } from "./getNearbyGymService"
import { GymInMemoryRepository } from "~/infra/repository/in-memory/gymInMemoryRepository"
import { faker } from "@faker-js/faker"

const user = {
	latitude: -23.0370522,
	longitude: -46.9744409,
}
const closerGym = {
	latitude: -23.0370522,
	longitude: -46.9744409,
}

const farawayGym = {
	latitude: -22.9,
	longitude: -47.0132744,
}

describe("Get nearby gyms Service", () => {
	let gymRepository: IGymRepository
	let sut: GetNearbyGymService

	beforeEach(() => {
		gymRepository = new GymInMemoryRepository()
		sut = new GetNearbyGymService(gymRepository)
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it("Should be able to get all gyms within 10km", async () => {
		vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
		await Promise.all([
			gymRepository.create({
				title: "Nearby Gym",
				description: faker.lorem.paragraph(),
				phone: faker.phone.number(),
				latitude: closerGym.latitude,
				longitude: closerGym.longitude,
			}),
			gymRepository.create({
				title: "Faraway Gym",
				description: faker.lorem.paragraph(),
				phone: faker.phone.number(),
				latitude: farawayGym.latitude,
				longitude: farawayGym.longitude,
			}),
		])

		const { gyms } = await sut.execute({
			userLatitude: user.latitude,
			userLongitude: user.longitude,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: "Nearby Gym" })])
	})
})
