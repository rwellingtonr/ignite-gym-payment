import { z } from "zod"
import { handleControllerError } from "~/helpers/errors"
import { makeAuthenticateService } from "~/useCases/authenticate/factory/makeAuthenticateService"
import { IBaseController } from "../interface"

export const handleAuthenticate: IBaseController = async (request, reply) => {
	try {
		const userSchema = z.object({
			password: z.string().min(8),
			email: z.string().email(),
		})
		const { email, password } = await userSchema.parseAsync(request.body)

		const service = makeAuthenticateService()
		const { user } = await service.execute({ email, password })

		const token = await reply.jwtSign(
			{ role: user.role },
			{
				sign: {
					sub: user.id,
				},
			},
		)
		const refreshToken = await reply.jwtSign(
			{ role: user.role },
			{
				sign: {
					sub: user.id,
					expiresIn: "7d",
				},
			},
		)

		return reply
			.setCookie("refreshToken", refreshToken, {
				path: "/",
				httpOnly: true,
				secure: true,
				sameSite: true,
			})
			.status(200)
			.send({ user, token })
	} catch (error) {
		return handleControllerError(error, reply)
	}
}
