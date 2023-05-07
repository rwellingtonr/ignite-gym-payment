import { IBaseController } from "../interface"
import { makeGetUserMetricsService } from "~/useCases/check-in/factory/makeGetUserMetricsService"

export const handleCheckInMetrics: IBaseController = async (request, reply) => {
	const service = makeGetUserMetricsService()

	const result = await service.execute({ userId: request.user.sub })

	return reply.status(200).send(result)
}
