import { Gym } from "@prisma/client"
import { makeError } from "~/helpers/errors"
import { IGymRepository, type GymInputData } from "~/infra/repository/gym/interface"

interface CreateGymRequest {
	title: string
	description: string | null
	phone: string | null
	latitude: number
	longitude: number
}
interface CreateGymResponse {
	gym: Gym
}

export class CreateGymService {
	constructor(private readonly gymRepository: IGymRepository) {}

	async execute(props: CreateGymRequest): Promise<CreateGymResponse> {
		const gymCreated = await this.gymRepository.create(props)

		return { gym: gymCreated }
	}
}
