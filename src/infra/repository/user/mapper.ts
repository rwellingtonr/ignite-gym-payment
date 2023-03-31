import { UserEntity } from "~/domain/entity/userEntity"
import type { UserRepositoryData } from "./interface"

export function mapperToDomain(user: UserRepositoryData): UserEntity {
	if (!user) return null

	return {
		id: user.id,
		email: user.email,
		name: user.name,
		password: user.passwordHash,
		createdAt: user.createdAt,
	}
}
