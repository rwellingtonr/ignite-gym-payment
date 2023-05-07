import { beforeEach, describe, it, expect } from "vitest"
import { ICheckInRepository } from "~/infra/repository/check-in/interface"
import { CheckInRepositoryInMemory } from "~/infra/repository/in-memory/checkInRepositoryInMemory"
import { GetUserMetricsService } from "./getUserMetricsService"

describe("Get User Metrics Service", () => {
	let checkInRepository: ICheckInRepository
	let sut: GetUserMetricsService

	beforeEach(() => {
		checkInRepository = new CheckInRepositoryInMemory()

		sut = new GetUserMetricsService(checkInRepository)
	})

	it("Should be able count user's check-in", async () => {
		for (let index = 0; index < 2; index++) {
			await checkInRepository.create({
				gymId: `gym-01-${index}`,
				userId: `user-some-id`,
			})
		}

		const { countCheckIns } = await sut.execute({ userId: `user-some-id` })

		expect(countCheckIns).toEqual(2)
	})
})
