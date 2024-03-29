import { FastifyInstance } from "fastify"
import { verifyJwt } from "../middlaware/verifyJwt"
import * as controller from "../controller/check-in"
import { verifyUserRole } from "../middlaware/verifyUserRole"

export const checkInRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJwt)

	app.post("/check-in/gym/:gymId", controller.handleCreateCheckIn)
	app.patch(
		"/check-in/:checkInId/validate",
		{ onRequest: [verifyUserRole("ADMIN")] },
		controller.handleValidateCheckIn,
	)

	app.get("/check-in/metrics", controller.handleCheckInMetrics)
	app.get("/check-in/history", controller.handleCheckInHistory)
}
