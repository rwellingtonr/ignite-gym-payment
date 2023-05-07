import { z } from "zod"
import { IBaseController } from "../interface"
import { makeCreateCheckInService } from "~/useCases/check-in/factory/makeCreateCheckInService"
import { handleControllerError } from "~/helpers/errors"

export const handleCreateCheckIn: IBaseController = async (request, reply) => {
	try {
		const paramsSchema = z.object({
			gymId: z.string().uuid(),
		})

		const bodySchema = z.object({
			latitude: z.number().refine((value) => Math.abs(value) <= 90),
			longitude: z.number().refine((value) => Math.abs(value) <= 180),
		})

		const [paramsValidate, bodyValidate] = await Promise.all([
			paramsSchema.parseAsync(request.params),
			bodySchema.parseAsync(request.body),
		])

		const serviceDto = {
			gymId: paramsValidate.gymId,
			userLatitude: bodyValidate.latitude,
			userLongitude: bodyValidate.longitude,
			userId: request.user.sub,
		}

		const service = makeCreateCheckInService()

		const result = await service.execute(serviceDto)

		return reply.status(200).send(result)
	} catch (error) {
		return handleControllerError(error, reply)
	}
}
