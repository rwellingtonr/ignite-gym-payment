import { GymRepository } from "~/infra/repository/gym/gymRepository"
import { GetNearbyGymService } from "../getNearbyGymService"

export const makeNearbyGymService = () => {
	const repository = new GymRepository()
	const service = new GetNearbyGymService(repository)
	return service
}
