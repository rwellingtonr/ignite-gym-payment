import { UserRepository } from "~/infra/repository/user/userRepository"
import { GetUserProfileService } from "../getUserProfile"

export const makeGetUserProfileService = () => {
	const repository = new UserRepository()
	const service = new GetUserProfileService(repository)
	return service
}
