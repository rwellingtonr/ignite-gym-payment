import * as controllers from "../controller"
import { FastifyInstance } from "fastify"
import { verifyJwt } from "../middlaware/verifyJwt"

export const apiRoutes = async (app: FastifyInstance) => {
	app.post("/users", controllers.handleRegister)
	app.post("/sessions", controllers.handleAuthenticate)

	// Authenticated

	app.get("/me", { onRequest: [verifyJwt] }, controllers.handleProfile)
}
