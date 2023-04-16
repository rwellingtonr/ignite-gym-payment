import { randomUUID } from "node:crypto"
import { type CheckInInputData, ICheckInRepository } from "../check-in/interface"
import { CheckIn } from "@prisma/client"

export class CheckInRepositoryInMemory implements ICheckInRepository {
	private checkIn: CheckIn[]

	constructor() {
		this.checkIn = []
	}

	async create(data: CheckInInputData): Promise<CheckIn> {
		const checkInData: CheckIn = {
			id: randomUUID(),
			createdAt: new Date(),
			userId: data.userId,
			validatedAt: data?.validatedAt ? new Date(data.validatedAt) : null,
			gymId: data.gymId,
		}

		this.checkIn.push(checkInData)
		return checkInData
	}
}
