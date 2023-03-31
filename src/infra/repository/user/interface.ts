import { Prisma, User } from "@prisma/client"
import { UserEntity } from "~/domain/entity/userEntity"

export type CreateUserInput = Prisma.UserCreateInput
export type UserRepositoryData = User

export interface IUserRepository {
	create(data: CreateUserInput): Promise<UserEntity>
	findByEmail(email: string): Promise<UserEntity>
}
