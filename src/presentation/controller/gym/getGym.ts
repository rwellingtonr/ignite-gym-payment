import { z } from "zod"
import { IBaseController } from "../interface"
import { makeSearchGymService } from "~/useCases/gym/factory/makeSearchGymService"

export const handleGetGym: IBaseController = async (request, reply) => {
	const gymSchema = z.object({
		q: z.string(),
		page: z.coerce.number().min(1).default(1),
	})
	const { q, page } = await gymSchema.parseAsync(request.query)

	const service = makeSearchGymService()

	const result = await service.execute({ page, query: q })

	return reply.status(200).send(result)
}
