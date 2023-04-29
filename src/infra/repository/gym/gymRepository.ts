import { Gym, Prisma } from "@prisma/client"
import { FindManyNearbyProps, IGymRepository } from "./interface"
import { prisma } from "~/infra/database"

export class GymRepository implements IGymRepository {
	async create(data: Prisma.GymCreateInput): Promise<Gym> {
		const gym = await prisma.gym.create({ data })
		return gym
	}
	async findById(id: string): Promise<Gym> {
		const gym = await prisma.gym.findUnique({ where: { id } })
		return gym
	}
	async findManyByTitle(title: string, page: number): Promise<Gym[]> {
		const elementsPerPage = 20
		const query: Prisma.GymFindManyArgs = {
			where: {
				title: {
					contains: title,
				},
			},
			skip: (page - 1) * elementsPerPage,
			take: elementsPerPage,
		}
		const gyms = await prisma.gym.findMany(query)
		return gyms
	}
	async findManyNearby(location: FindManyNearbyProps): Promise<Gym[]> {
		/**
     A query SQL apresentada está realizando uma busca de todas as academias que estão a uma distância máxima de 10km da localização representada pela latitude e longitude informadas como parâmetros. A fórmula utilizada no WHERE é conhecida como Haversine Formula, e é utilizada para calcular a distância entre dois pontos em um globo. O resultado é multiplicado por 6371 para obter a distância em quilômetros.
     */
		const maxKilometers = 10

		const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * 
      FROM gyms
      WHERE ( 6371 * acos( cos( radians(${location.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${location.longitude}) ) + sin( radians(${location.latitude}) ) * sin( radians( latitude ) ) ) ) <= ${maxKilometers}
    `
		return gyms
	}
}
