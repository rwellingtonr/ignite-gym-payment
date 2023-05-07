import { FastifyInstance } from "fastify"
import { verifyJwt } from "../middlaware/verifyJwt"
import * as controller from "../controller/gym"

export const gymsRoutes = async (app: FastifyInstance) => {
	app.addHook("onRequest", verifyJwt)

	app.post("/gym", controller.handleCreateGym)
	app.get("/gym/nearby", controller.handleGetGym)
	app.get("/gym/search", controller.handleGetGym)
}
