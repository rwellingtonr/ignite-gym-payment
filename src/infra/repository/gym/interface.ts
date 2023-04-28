import { Gym, Prisma } from "@prisma/client"

export type GymInputData = Prisma.GymCreateInput

export type FindManyNearbyProps = {
	latitude: number
	longitude: number
}

export interface IGymRepository {
	findById(id: string): Promise<Gym>
	create(data: GymInputData): Promise<Gym>
	findManyByTitle(title: string, page: number): Promise<Gym[]>
	findManyNearby(location: FindManyNearbyProps): Promise<Gym[]>
}
