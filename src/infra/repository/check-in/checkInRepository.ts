import { CheckIn } from "@prisma/client"
import { ICheckInRepository, type CheckInInputData } from "./interface"
import { prisma } from "~/infra/database"

export class CheckInRepository implements ICheckInRepository {
	async create(data: CheckInInputData): Promise<CheckIn> {
		const checkIn = await prisma.checkIn.create({ data })
		return checkIn
	}
}
