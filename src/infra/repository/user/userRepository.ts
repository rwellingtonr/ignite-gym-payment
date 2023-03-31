import { prisma } from "~/infra/database"
import { type CreateUserInput, IUserRepository } from "./interface"
import { mapperToDomain } from "./mapper"

export class UserRepository implements IUserRepository {
	async create(data: CreateUserInput) {
		const userCreated = await prisma.user.create({ data })

		return mapperToDomain(userCreated)
	}
	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({ where: { email } })
		return mapperToDomain(user)
	}
}
