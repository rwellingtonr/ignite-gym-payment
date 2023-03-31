import { FastifyError, FastifyReply } from "fastify"

interface BaseError extends Error, FastifyError {
	code: string
}

export const handleError = (error: BaseError, reply: FastifyReply) => {
	if (error?.code) {
		return reply.status(+error?.code).send({ error: error.message })
	}

	return reply.status(500).send({ error: "Internal Server Error!" })
}
