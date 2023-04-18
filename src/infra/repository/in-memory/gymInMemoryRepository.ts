import { Gym } from "@prisma/client"
import { GymInputData, IGymRepository } from "../gym/interface"
import { randomUUID } from "crypto"
import { Decimal } from "@prisma/client/runtime/library"

export class GymInMemoryRepository implements IGymRepository {
	private gyms: Gym[] = []
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
			latitude: new Decimal(data.latitude as number),
			longitude: new Decimal(data.longitude as number),
			phone: data.phone,
		}
		this.gyms.push(input)
		return input
	}
}
