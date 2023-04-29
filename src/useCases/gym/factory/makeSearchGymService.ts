import { GymRepository } from "~/infra/repository/gym/gymRepository"
import { SearchGymService } from "../searchGymService"

export const makeSearchGymService = () => {
	const repository = new GymRepository()
	const service = new SearchGymService(repository)
	return service
}
