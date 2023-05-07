import { z } from "zod"
import { IBaseController } from "../interface"
import { makeFetchHistoryService } from "~/useCases/check-in/factory/makeFetchHistoryService"

export const handleCheckInHistory: IBaseController = async (request, reply) => {
	const querySchema = z.object({
		page: z.coerce.number().min(1).default(1),
	})
	const { page } = await querySchema.parseAsync(request.query)

	const service = makeFetchHistoryService()

	const result = await service.execute({ page, userId: request.user.sub })

	return reply.status(200).send(result)
}
