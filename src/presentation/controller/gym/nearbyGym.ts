import { z } from "zod"
import { IBaseController } from "../interface"
import { makeSearchGymService } from "~/useCases/gym/factory/makeSearchGymService"

export const handleGetNearbyGym: IBaseController = async (request, reply) => {
	const gymSchema = z.object({
		q: z.string(),
		page: z.coerce.number().min(1).default(1),
	})
	const { q, page } = await gymSchema.parseAsync(request.query)

	const service = makeSearchGymService()

	const result = await service.execute({ query: q, page })

	return reply.status(200).send(result)
}
