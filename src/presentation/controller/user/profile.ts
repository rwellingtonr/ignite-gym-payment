import { handleControllerError } from "~/helpers/errors"
import { makeGetUserProfileService } from "~/useCases/user/factory/makeGetUserProfileService"
import { IBaseController } from "../interface"
import { domainToPresentation } from "./mapper"

export const handleProfile: IBaseController = async (request, reply) => {
	try {
		await request.jwtVerify()

		const userId = request.user.sub

		const service = makeGetUserProfileService()

		const result = await service.execute({ id: userId })
		const { user } = domainToPresentation(result.user)

		return reply.status(200).send({ user })
	} catch (error) {
		return handleControllerError(error, reply)
	}
}
