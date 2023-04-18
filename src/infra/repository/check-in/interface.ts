import { CheckIn, Prisma } from "@prisma/client"

export type CheckInInputData = Prisma.CheckInUncheckedCreateInput

export interface ICheckInRepository {
	create(data: CheckInInputData): Promise<CheckIn>
	findByUserIdOnData(userId: string, date: Date): Promise<CheckIn | null>
}
