import { z } from "zod"
import { IBaseController } from "../interface"
import { makeCreateGymService } from "~/useCases/gym/factory/makeCreateGymService"

export const handleCreateGym: IBaseController = async (request, reply) => {
	const gymSchema = z.object({
		description: z.string().nullable(),
		latitude: z.number().refine((value) => Math.abs(value) <= 90),
		longitude: z.number().refine((value) => Math.abs(value) <= 180),
		phone: z
			.string()
			.nullable()
			.transform((contact) => contact?.replace(/D/g, "")),
		title: z.string(),
	})
	const { description, latitude, longitude, phone, title } = await gymSchema.parseAsync(
		request.body,
	)

	const service = makeCreateGymService()

	const result = await service.execute({ description, latitude, longitude, phone, title })

	return reply.status(201).send(result)
}
