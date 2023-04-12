import { UserEntity } from "~/domain/entity/userEntity"
import { IUserRepository, type CreateUserInput } from "../user/interface"
import { mapperToDomain } from "../user/mapper"
import { User } from "@prisma/client"
import { randomUUID } from "crypto"

export class UserInMemoryRepository implements IUserRepository {
	private users: User[]

	constructor() {
		this.users = []
	}

	async create(data: CreateUserInput): Promise<UserEntity> {
		const user: User = {
			createdAt: new Date(),
			email: data.email,
			passwordHash: data.passwordHash,
			name: data.name,
			id: randomUUID(),
		}

		this.users.push(user)

		return mapperToDomain(user)
	}
	async findByEmail(email: string): Promise<UserEntity> {
		const user = this.users.find((user) => user.email === email)
		return user ? mapperToDomain(user) : null
	}
	async findById(id: string): Promise<UserEntity> {
		const user = this.users.find((user) => user.id === id)
		return user ? mapperToDomain(user) : null
	}
}
