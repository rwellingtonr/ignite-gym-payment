import { UserEntity } from "~/domain/entity/userEntity"
import { hashPassword } from "~/helpers/bcryptjs"
import { UserRepository } from "~/infra/repository/userRepository"

export const createUserService = async ({ email, name, password }: UserEntity) => {
	const userRepository = new UserRepository()

	const alreadyExists = await userRepository.findByEmail(email)
	if (alreadyExists) {
		throw new Error("This user already exists!")
	}

	const passwordHash = await hashPassword(password)

	const userCreated = await userRepository.create({
		email,
		name,
		passwordHash,
	})
	return userCreated
}
