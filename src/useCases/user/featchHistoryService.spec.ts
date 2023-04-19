import { beforeEach, describe, it, expect } from "vitest"
import { ICheckInRepository } from "~/infra/repository/check-in/interface"
import { CheckInRepositoryInMemory } from "~/infra/repository/in-memory/checkInRepositoryInMemory"

import { FetchHistoryService } from "./fetchHistoryService"

describe("Fetch User History Service", () => {
	let checkInRepository: ICheckInRepository
	let sut: FetchHistoryService

	beforeEach(() => {
		checkInRepository = new CheckInRepositoryInMemory()

		sut = new FetchHistoryService(checkInRepository)
	})

	it("Should be able to fetch user history", async () => {
		for (let index = 0; index < 2; index++) {
			await checkInRepository.create({
				gymId: `gym-01-${index}`,
				userId: `user-some-id`,
			})
		}

		const { checkIn } = await sut.execute({ userId: `user-some-id`, page: 1 })

		expect(checkIn).toHaveLength(2)
		expect(checkIn).toEqual([
			expect.objectContaining({ gymId: `gym-01-0` }),
			expect.objectContaining({ gymId: `gym-01-1` }),
		])
	})
	it("Should be able to fetch the second page of the user history", async () => {
		for (let index = 0; index < 23; index++) {
			await checkInRepository.create({
				gymId: `gym-01-${index}`,
				userId: `user-some-id`,
			})
		}

		const { checkIn } = await sut.execute({ userId: `user-some-id`, page: 2 })

		expect(checkIn).toHaveLength(3)
		expect(checkIn).toEqual([
			expect.objectContaining({ gymId: `gym-01-20` }),
			expect.objectContaining({ gymId: `gym-01-21` }),
			expect.objectContaining({ gymId: `gym-01-22` }),
		])
	})
})
