import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { handleControllerError } from "~/helpers/errors"
import { makeCreateUserService } from "~/useCases/user/factory/makeUserService"

export const handleRegister = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const userSchema = z.object({
			name: z.string(),
			password: z.string().min(8),
			email: z.string().email(),
		})
		const { email, name, password } = await userSchema.parseAsync(request.body)

		const service = makeCreateUserService()

		const result = await service.execute({ email, name, password })

		return reply.status(201).send(result)
	} catch (error) {
		return handleControllerError(error, reply)
	}
}
