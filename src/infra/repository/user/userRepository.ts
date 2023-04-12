import { prisma } from "~/infra/database"
import { type CreateUserInput, IUserRepository } from "./interface"
import { mapperToDomain } from "./mapper"
import { UserEntity } from "~/domain/entity/userEntity"

export class UserRepository implements IUserRepository {
	async create(data: CreateUserInput) {
		const userCreated = await prisma.user.create({ data })

		return mapperToDomain(userCreated)
	}
	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({ where: { email } })
		return mapperToDomain(user)
	}
	async findById(id: string): Promise<UserEntity> {
		const user = await prisma.user.findUnique({ where: { id } })
		return mapperToDomain(user)
	}
}
