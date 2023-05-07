import { FastifyInstance } from "fastify"
import { verifyJwt } from "../middlaware/verifyJwt"
import * as controller from "../controller/gym"
import { verifyUserRole } from "../middlaware/verifyUserRole"

export const gymsRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJwt)

	app.post("/gym", { onRequest: [verifyUserRole("ADMIN")] }, controller.handleCreateGym)
	app.get("/gym/nearby", controller.handleGetNearbyGym)
	app.get("/gym/search", controller.handleGetGym)
}
