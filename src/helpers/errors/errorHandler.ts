import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { ZodError } from "zod"
import { app } from "~/app"
import { environment } from "~/config/env"

export function handleError(err: FastifyError, _request: FastifyRequest, reply: FastifyReply) {
	if (err instanceof ZodError) {
		return reply.status(400).send({
			message: "Validation Error!",
			issue: err.format(),
		})
	}

	if (/prisma/gm.test(err.message)) {
		return reply.status(400).send({
			message: "Prisma Error!",
			issue: err.message,
		})
	}

	if (environment.nodeEnv !== "production") {
		app.log.error(err)
	}

	return reply.status(500).send({
		message: "Internal Server Error",
		issue: JSON.stringify(err),
	})
}
