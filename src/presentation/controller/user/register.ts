import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { handleError } from "~/helpers/errors"
import { UserRepository } from "~/infra/repository/user/userRepository"
import { CreateUserService } from "~/useCases/user/createUser"

export const handleRegister = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const userSchema = z.object({
			name: z.string(),
			password: z.string().min(8),
			email: z.string().email(),
		})
		const { email, name, password } = await userSchema.parseAsync(request.body)

		const repository = new UserRepository()

		const service = new CreateUserService(repository)
		const result = await service.execute({ email, name, password })

		return reply.status(201).send({ result })
	} catch (error) {
		return handleError(error, reply)
	}
}
