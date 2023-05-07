import { IBaseController } from "../interface"

export const handleRefreshToken: IBaseController = async (request, reply) => {
	await request.jwtVerify({ onlyCookie: true })

	const { sub, role } = request.user

	const token = await reply.jwtSign(
		{ role },
		{
			sign: {
				sub: sub,
			},
		},
	)
	const refreshToken = await reply.jwtSign(
		{ role },
		{
			sign: {
				sub: request.user.sub,
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
		.send({ token })
}
