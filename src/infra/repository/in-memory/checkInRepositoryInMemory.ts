import { randomUUID } from "node:crypto"
import { type CheckInInputData, ICheckInRepository } from "../check-in/interface"
import { CheckIn, Prisma } from "@prisma/client"
import dayjs from "dayjs"
import { getStartAndEndDate } from "~/utils/date"

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
	async findById(id: string): Promise<CheckIn> {
		const response = this.checkIn.find((c) => c.id === id)
		return response ?? null
	}

	async findByUserIdOnData(userId: string, date: Date): Promise<CheckIn> {
		const { startOfTheDay, endOfTheDay } = getStartAndEndDate(date)
		const checkIn = this.checkIn.find((check) => {
			const checkInDate = dayjs(check.createdAt)
			const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
			return check.userId === userId && isOnSameDate
		})

		return checkIn ?? null
	}

	async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
		return this.checkIn.filter((check) => check.userId === userId).slice((page - 1) * 20, page * 20)
	}

	async countByUserId(userId: string): Promise<number> {
		return this.checkIn.filter((check) => check.userId === userId)?.length
	}

	async update(data: CheckIn): Promise<CheckIn> {
		const index = this.checkIn.findIndex((entry) => entry.id === data.id)

		if (index < 0) return null

		const updateData = data as CheckIn
		this.checkIn[index] = updateData

		return this.checkIn[index]
	}
}
