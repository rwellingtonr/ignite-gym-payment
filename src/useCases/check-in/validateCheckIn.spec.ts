import { afterEach, beforeEach, describe, it, expect, vi } from "vitest"
import { ICheckInRepository } from "~/infra/repository/check-in/interface"
import { CheckInRepositoryInMemory } from "~/infra/repository/in-memory/checkInRepositoryInMemory"
import { ValidateCheckInService } from "./validateCheckIn"
import { randomUUID } from "crypto"

describe("Validate check-in Service", () => {
	let checkInRepository: ICheckInRepository
	let sut: ValidateCheckInService

	beforeEach(() => {
		checkInRepository = new CheckInRepositoryInMemory()
		sut = new ValidateCheckInService(checkInRepository)
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it("Should be able to validate a check-in", async () => {
		vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
		const response = await checkInRepository.create({
			gymId: randomUUID(),
			userId: "random-id",
		})

		const { checkIn } = await sut.execute({ checkInId: response.id })

		expect(checkIn.validatedAt).toEqual(expect.any(Date))
	})
	it("Should not find an check-in", async () => {
		vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))
		await checkInRepository.create({
			gymId: randomUUID(),
			userId: "random-id",
		})

		await expect(() => sut.execute({ checkInId: randomUUID() })).rejects.toThrow()
	})

	it("Should not be able to validate check-in after 20 minutes", async () => {
		vi.setSystemTime(new Date(2023, 0, 20, 8, 10, 15))
		const createCheckIn = {
			gymId: randomUUID(),
			userId: "random-id",
		}
		const { id } = await checkInRepository.create(createCheckIn)
		const twentyOneMinutes = 1000 * 60 * 21
		vi.advanceTimersByTime(twentyOneMinutes)

		await expect(() => sut.execute({ checkInId: id })).rejects.toThrow()
	})
})
