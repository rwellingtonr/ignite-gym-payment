import { Gym } from "@prisma/client"
import { IGymRepository } from "~/infra/repository/gym/interface"

interface GetNearbyGymRequest {
	userLatitude: number
	userLongitude: number
}
interface GetNearbyGymResponse {
	gyms: Gym[]
}

export class GetNearbyGymService {
	constructor(private readonly gymRepository: IGymRepository) {}

	async execute({
		userLatitude,
		userLongitude,
	}: GetNearbyGymRequest): Promise<GetNearbyGymResponse> {
		const gyms = await this.gymRepository.findManyNearby({
			latitude: userLatitude,
			longitude: userLongitude,
		})

		return { gyms }
	}
}
