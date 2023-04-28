import { Gym } from "@prisma/client"
import { type FindManyNearbyProps, type GymInputData, IGymRepository } from "../gym/interface"
import { randomUUID } from "crypto"
import { Decimal } from "@prisma/client/runtime/library"
import { getDistanceBetweenCoordinates } from "~/utils/getDistanceBetweenCoordinates"

const ELEMENTS_PER_PAGE = 20

export class GymInMemoryRepository implements IGymRepository {
	private gyms: Gym[]

	constructor() {
		this.gyms = []
	}

	async findById(id: string): Promise<Gym> {
		const gym = this.gyms.find((gym) => gym.id === id)
		return gym ?? null
	}
	async create(data: GymInputData): Promise<Gym> {
		const input = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description,
			latitude: new Decimal(data.latitude.toString()),
			longitude: new Decimal(data.longitude.toString()),
			phone: data.phone,
		}
		this.gyms.push(input)
		return input
	}

	async findManyByTitle(title: string, page: number): Promise<Gym[]> {
		const response = this.gyms
			.filter((gym) => gym.title.includes(title))
			.slice((page - 1) * ELEMENTS_PER_PAGE, page * ELEMENTS_PER_PAGE)

		return response
	}

	async findManyNearby(location: FindManyNearbyProps): Promise<Gym[]> {
		return this.gyms.filter((gym) => {
			const from = {
				latitude: location.latitude,
				longitude: location.longitude,
			}
			const to = {
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			}
			const distance = getDistanceBetweenCoordinates(from, to)
			console.log(distance)

			return distance < 10
		})
	}
}
