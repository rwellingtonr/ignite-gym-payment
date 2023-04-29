import { CheckInRepository } from "~/infra/repository/check-in/checkInRepository"
import { CreateCheckInService } from "../createCheckIn"
import { GymRepository } from "~/infra/repository/gym/gymRepository"

export const makeCreateCheckInService = () => {
	const checkInRepository = new CheckInRepository()
	const gymRepository = new GymRepository()
	const service = new CreateCheckInService(checkInRepository, gymRepository)
	return service
}
