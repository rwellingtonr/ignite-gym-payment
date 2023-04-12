import { UserEntity } from "~/domain/entity/userEntity"
import { comparePassword } from "~/helpers/bcryptjs"
import { makeError } from "~/helpers/errors"
import { IUserRepository } from "~/infra/repository/user/interface"

interface AuthenticateRequest {
	email: string
	password: string
}

interface AuthenticateResponse {
	user: UserEntity
}

export class AuthenticateService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			const Error404 = makeError("404", "Could not find this user")
			throw new Error404()
		}

		const isRightPassword = await comparePassword(password, user.password)

		if (!isRightPassword) {
			const Error403 = makeError("403", "Invalid credentials")
			throw new Error403()
		}

		return { user }
	}
}
