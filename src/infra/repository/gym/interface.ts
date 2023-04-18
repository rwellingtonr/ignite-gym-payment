import { Gym, Prisma } from "@prisma/client"

export type GymInputData = Prisma.GymCreateInput

export interface IGymRepository {
	findById(id: string): Promise<Gym>
	create(data: GymInputData): Promise<Gym>
}
