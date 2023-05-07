import { z } from "zod"
import { IBaseController } from "../interface"
import { makeNearbyGymService } from "~/useCases/gym/factory/makeGetNearbyGymService"

export const handleGetNearbyGym: IBaseController = async (request, reply) => {
	const gymSchema = z.object({
		latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
		longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
	})
	const { latitude, longitude } = await gymSchema.parseAsync(request.query)

	const service = makeNearbyGymService()

	const result = await service.execute({ userLatitude: latitude, userLongitude: longitude })

	return reply.status(200).send(result)
}
