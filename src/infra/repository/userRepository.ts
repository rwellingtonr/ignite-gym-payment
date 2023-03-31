import { prisma } from "../database"
import { Prisma } from "@prisma/client"

export class UserRepository {
	async create(data: Prisma.UserCreateInput) {
		const userCreated = await prisma.user.create({ data })
		return userCreated
	}
	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({ where: { email } })
		return user
	}
}
