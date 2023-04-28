import { Gym } from "@prisma/client"
import { IGymRepository } from "~/infra/repository/gym/interface"

interface SearchGymRequest {
	page: number
	query: string
}
interface SearchGymResponse {
	gyms: Gym[]
}

export class SearchGymService {
	constructor(private readonly gymRepository: IGymRepository) {}

	async execute(props: SearchGymRequest): Promise<SearchGymResponse> {
		const gyms = await this.gymRepository.findManyByTitle(props.query, props.page)

		return { gyms }
	}
}
