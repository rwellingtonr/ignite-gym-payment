import { FetchHistoryService } from "../fetchHistoryService"
import { CheckInRepository } from "~/infra/repository/check-in/checkInRepository"

export const makeFetchHistoryService = () => {
	const repository = new CheckInRepository()
	const service = new FetchHistoryService(repository)
	return service
}
