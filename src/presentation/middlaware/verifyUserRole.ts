import { FastifyReply, FastifyRequest } from "fastify"
import type { Role } from "~/domain/entity/userEntity"

export const verifyUserRole = (roleToCheck: Role) => {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const { role } = request.user

		if (role !== roleToCheck) {
			return reply.status(401).send({ message: "UNAUTHORIZED: Access Denied" })
		}
	}
}
