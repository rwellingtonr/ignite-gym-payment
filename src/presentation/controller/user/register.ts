import { z } from "zod"
import { handleControllerError } from "~/helpers/errors"
import { makeCreateUserService } from "~/useCases/user/factory/makeUserService"
import { IBaseController } from "../interface"
import { domainToPresentation } from "./mapper"

export const handleRegister: IBaseController = async (request, reply) => {
	try {
		const userSchema = z.object({
			name: z.string(),
			password: z.string().min(8),
			email: z.string().email(),
		})
		const { email, name, password } = await userSchema.parseAsync(request.body)

		const service = makeCreateUserService()

		const result = await service.execute({ email, name, password })
		const { user } = domainToPresentation(result.user)

		return reply.status(201).send({ user })
	} catch (error) {
		return handleControllerError(error, reply)
	}
}
