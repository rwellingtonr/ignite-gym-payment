import { describe, it } from "node:test"
import { beforeAll, expect } from "vitest"
import { ICheckInRepository } from "~/infra/repository/check-in/interface"
import { CheckInRepositoryInMemory } from "~/infra/repository/in-memory/checkInRepositoryInMemory"
import { CreateCheckInService } from "./createCheckIn"

describe("", () => {
	let repository: ICheckInRepository
	let sut: CreateCheckInService
	beforeAll(() => {
		repository = new CheckInRepositoryInMemory()
		sut = new CreateCheckInService(repository)
	})

	it("Should create an check-in", async () => {
		const response = await sut.execute({
			gymId: "gym-id",
			userId: "user-id",
		})

		expect(response?.checkIn).toHaveProperty("id")
	})
})
