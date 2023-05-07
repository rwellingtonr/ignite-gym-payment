import { UserEntity } from "~/domain/entity/userEntity"

type DomainToPresentationResponse = {
	user: Omit<UserEntity, "password">
}

export const domainToPresentation = (user: UserEntity) => {
	const response: DomainToPresentationResponse = {
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
			createdAt: user.createdAt,
			role: user.role,
		},
	}
	return response
}
