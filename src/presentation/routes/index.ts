import { FastifyInstance } from "fastify"
import * as controllers from "../controller"

export const apiRoutes = async (app: FastifyInstance) => {
	app.post("/users", controllers.handleRegister)
	app.post("/sessions", controllers.handleAuthenticate)

	// Authenticated

	app.get("/me", controllers.handleProfile)
}
