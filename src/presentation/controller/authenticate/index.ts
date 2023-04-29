import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { handleControllerError } from "~/helpers/errors"
import { makeAuthenticateService } from "~/useCases/authenticate/factory/makeAuthenticateService"

export const handleAuthenticate = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const userSchema = z.object({
			password: z.string().min(8),
			email: z.string().email(),
		})
		const { email, password } = await userSchema.parseAsync(request.body)

		const service = makeAuthenticateService()
		const { user } = await service.execute({ email, password })

		const token = await reply.jwtSign(
			{},
			{
				sign: {
					sub: user.id,
					expiresIn: "1d",
				},
			},
		)

		return reply.status(200).send({ user, token })
	} catch (error) {
		return handleControllerError(error, reply)
	}
}
