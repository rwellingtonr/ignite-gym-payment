import { UserEntity } from "~/domain/entity/userEntity"
import { makeError } from "~/helpers/errors"
import { IUserRepository } from "~/infra/repository/user/interface"

interface GetUserProfileRequest {
	id: string
}

interface GetUserProfileResponse {
	user: UserEntity
}

export class GetUserProfileService {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute({ id }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
		const user = await this.userRepository.findById(id)

		if (!user) {
			const Error404 = makeError("404", "Could not find this user")
			throw new Error404()
		}

		return { user }
	}
}
