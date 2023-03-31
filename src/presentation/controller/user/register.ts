import { FastifyReply, FastifyRequest } from "fastify"
import { createUserService } from "~/useCases/user/createUser"
import { z } from "zod"

export const handleRegister = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const userSchema = z.object({
			name: z.string(),
			password: z.string().min(8),
			email: z.string().email(),
		})
		const { email, name, password } = await userSchema.parseAsync(request.body)

		const result = await createUserService({ email, password, name })

		return reply.status(201).send({ result })
	} catch (error) {
		console.log(error)
		return reply.status(400).send({ error })
	}
}
