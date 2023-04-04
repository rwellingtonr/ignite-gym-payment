import { FastifyError, FastifyReply } from "fastify"

interface BaseError extends Error, FastifyError {
	code: string
}

export const handleControllerError = (error: BaseError, reply: FastifyReply) => {
	if (error?.code) {
		return reply.status(+error?.code).send({ message: error.message })
	}

	throw error
}
