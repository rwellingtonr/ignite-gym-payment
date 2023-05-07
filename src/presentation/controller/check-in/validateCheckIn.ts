import { z } from "zod"
import { IBaseController } from "../interface"
import { makeValidateCheckInService } from "~/useCases/check-in/factory/makeValidateCheckInService"
import { handleControllerError } from "~/helpers/errors"

export const handleValidateCheckIn: IBaseController = async (request, reply) => {
	try {
		const paramsSchema = z.object({
			checkInId: z.string().uuid(),
		})
		const { checkInId } = await paramsSchema.parseAsync(request.body)

		const service = makeValidateCheckInService()

		const result = await service.execute({ checkInId })

		return reply.status(200).send(result)
	} catch (error) {
		return handleControllerError(error, reply)
	}
}
