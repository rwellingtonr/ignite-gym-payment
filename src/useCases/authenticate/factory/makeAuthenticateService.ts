import { UserRepository } from "~/infra/repository/user/userRepository"
import { AuthenticateService } from "../authenticate"

export function makeAuthenticateService() {
	const repository = new UserRepository()

	const service = new AuthenticateService(repository)
	return service
}
