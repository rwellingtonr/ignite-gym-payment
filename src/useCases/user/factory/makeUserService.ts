import { UserRepository } from "~/infra/repository/user/userRepository"
import { CreateUserService } from "../createUser"

export function makeCreateUserService() {
	const repository = new UserRepository()

	const service = new CreateUserService(repository)
	return service
}
