import { CheckIn, Prisma } from "@prisma/client"
import { ICheckInRepository, type CheckInInputData } from "./interface"
import { prisma } from "~/infra/database"
import dayjs from "dayjs"
import { getStartAndEndDate } from "~/utils/date"

export class CheckInRepository implements ICheckInRepository {
	async create(data: CheckInInputData): Promise<CheckIn> {
		const checkIn = await prisma.checkIn.create({ data })
		return checkIn
	}
	async update({ id, ...updateData }: CheckIn): Promise<CheckIn> {
		const checkIn = await prisma.checkIn.update({
			where: { id },
			data: updateData,
		})
		return checkIn
	}
	async findById(id: string): Promise<CheckIn> {
		const checkIn = await prisma.checkIn.findUnique({ where: { id } })
		return checkIn
	}
	async findByUserIdOnData(userId: string, date: Date): Promise<CheckIn> {
		const { startOfTheDay, endOfTheDay } = getStartAndEndDate(date)
		const query = {
			where: {
				userId,
				createdAt: {
					gte: startOfTheDay,
					lte: endOfTheDay,
				},
			},
		}

		const checkIns = await prisma.checkIn.findFirst(query)
		return checkIns
	}
	async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
		const elementsPerPage = 20
		const query = {
			where: {
				userId,
			},
			skip: (page - 1) * elementsPerPage,
			take: elementsPerPage,
		}

		const checkIns = await prisma.checkIn.findMany(query)
		return checkIns
	}
	async countByUserId(userId: string): Promise<number> {
		const count = await prisma.checkIn.count({
			where: { userId },
		})
		return count
	}
}
