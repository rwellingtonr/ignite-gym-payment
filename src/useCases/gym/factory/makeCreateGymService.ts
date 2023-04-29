import { GymRepository } from "~/infra/repository/gym/gymRepository"
import { CreateGymService } from "../createGymService"

export const makeCreateGymService = () => {
	const repository = new GymRepository()
	const service = new CreateGymService(repository)
	return service
}
