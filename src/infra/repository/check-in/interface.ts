import { CheckIn, Prisma } from "@prisma/client"

export type CheckInInputData = Prisma.CheckInUncheckedCreateInput
export type UpdateCheckInData = Prisma.CheckInUpdateInput
export interface ICheckInRepository {
	create(data: CheckInInputData): Promise<CheckIn>
	findByUserIdOnData(userId: string, date: Date): Promise<CheckIn | null>
	findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
	countByUserId(userId: string): Promise<number>
	findById(id: string): Promise<CheckIn>
	update(data: UpdateCheckInData): Promise<CheckIn>
}
