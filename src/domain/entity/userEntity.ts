export interface UserEntity {
	id?: string
	name: string
	email: string
	password: string
	createdAt?: Date
	role: Role
}
export type Role = "ADMIN" | "MEMBER"
