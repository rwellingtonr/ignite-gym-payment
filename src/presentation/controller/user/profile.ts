import { FastifyReply, FastifyRequest } from "fastify"

export const handleProfile = async (request: FastifyRequest, reply: FastifyReply) => {
	await request.jwtVerify()

	console.log(request.user.sub)
	return reply.status(200).send()
}
