import { CheckInRepository } from "~/infra/repository/check-in/checkInRepository"
import { ValidateCheckInService } from "../validateCheckIn"

export const makeValidateCheckInService = () => {
	const repository = new CheckInRepository()
	const service = new ValidateCheckInService(repository)
	return service
}
