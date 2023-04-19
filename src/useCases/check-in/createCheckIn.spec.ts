import { afterEach, beforeEach, describe, it, expect, vi } from "vitest"
import { ICheckInRepository } from "~/infra/repository/check-in/interface"
import { CheckInRepositoryInMemory } from "~/infra/repository/in-memory/checkInRepositoryInMemory"
import { CreateCheckInService } from "./createCheckIn"
import { IGymRepository } from "~/infra/repository/gym/interface"
import { GymInMemoryRepository } from "~/infra/repository/in-memory/gymInMemoryRepository"
import { faker } from "@faker-js/faker"

describe("Create check-in Service", () => {
	let checkInRepository: ICheckInRepository
	let gymRepository: IGymRepository
	let sut: CreateCheckInService

	beforeEach(() => {
		checkInRepository = new CheckInRepositoryInMemory()
		gymRepository = new GymInMemoryRepository()
		sut = new CreateCheckInService(checkInRepository, gymRepository)
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

	it("Should create an check-in", async () => {
		vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
		const response = await sut.execute({
			gymId: "gym-id",
			userId: "user-id",
			userLatitude: 0,
			userLongitude: 0,
		})

		expect(response?.checkIn.id).toEqual(expect.any(String))
	})

	it("Should not be able to check-in twice on the same day", async () => {
		vi.setSystemTime(new Date(2023, 1, 1, 13))
		const input = {
			gymId: "gym-id",
			userId: "user-id",
			userLatitude: 0,
			userLongitude: 0,
		}

		await sut.execute(input)
		vi.setSystemTime(new Date(2023, 1, 1, 13))
		await expect(() => sut.execute(input)).rejects.toThrowError(/Not allowed/)
	})
	it("Should be able to check-in twice on different days", async () => {
		vi.setSystemTime(new Date(2023, 1, 1, 13))
		const input = {
			gymId: "gym-id",
			userId: "user-id",
			userLatitude: 0,
			userLongitude: 0,
		}

		await sut.execute(input)
		vi.setSystemTime(new Date(2023, 1, 2, 13))

		const { checkIn } = await sut.execute(input)

		expect(checkIn.id).toEqual(expect.any(String))
	})
	it("Should not be able to check-in when is far away from the gym", async () => {
		vi.setSystemTime(new Date(2023, 1, 1, 13))

		gymRepository.create({
			id: "gym-id-2",
			latitude: -23.050076,
			longitude: -46.875178,
			title: faker.lorem.slug(),
			description: faker.lorem.paragraph(),
			phone: faker.phone.number(),
		})

		const input = {
			gymId: "gym-id-2",
			userId: "user-id",
			userLatitude: -46.997467,
			userLongitude: -23.068905,
		}

		await expect(() => sut.execute(input)).rejects.toThrow()
	})
})
