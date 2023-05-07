import { UserEntity } from "~/domain/entity/userEntity"
import { hashPassword } from "~/helpers/bcryptjs"
import { makeError } from "~/helpers/errors"
import type { CreateUserInput, IUserRepository } from "~/infra/repository/user/interface"

export class CreateUserService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute({ email, name, password, role }: UserEntity) {
		const alreadyExists = await this.userRepository.findByEmail(email)
		if (alreadyExists) {
			const Error409 = makeError("409", "This user already exists!")
			throw new Error409()
		}

		const passwordHash = await hashPassword(password)

		const createUser: CreateUserInput = {
			email,
			name,
			passwordHash,
			role,
		}

		const userCreated = await this.userRepository.create(createUser)

		return { user: userCreated }
	}
}
