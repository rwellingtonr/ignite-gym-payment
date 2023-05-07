import * as userController from "../controller/user"
import * as authenticateController from "../controller/authenticate"
import { FastifyInstance } from "fastify"
import { verifyJwt } from "../middlaware/verifyJwt"

export const userRoutes = async (app: FastifyInstance) => {
	app.post("/users", userController.handleRegister)
	app.post("/sessions", authenticateController.handleAuthenticate)

	// Authenticated

	app.get("/me", { onRequest: [verifyJwt] }, userController.handleProfile)
}
