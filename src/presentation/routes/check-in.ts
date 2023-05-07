import { FastifyInstance } from "fastify"
import { verifyJwt } from "../middlaware/verifyJwt"
import * as controller from "../controller/check-in"

export const checkInRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJwt)

	app.get("/check-in/metrics", controller.handleCheckInMetrics)
	app.get("/check-in/history", controller.handleCheckInHistory)

	app.post("/check-in/:gymId", controller.handleCreateCheckIn)
	app.patch("/check-in/:checkInId/validate", controller.handleValidateCheckIn)
}
