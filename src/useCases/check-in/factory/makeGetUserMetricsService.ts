import { CheckInRepository } from "~/infra/repository/check-in/checkInRepository"
import { GetUserMetricsService } from "../getUserMetricsService"

export const makeGetUserMetricsService = () => {
	const repository = new CheckInRepository()
	const service = new GetUserMetricsService(repository)
	return service
}
