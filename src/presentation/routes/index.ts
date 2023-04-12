import { FastifyInstance } from "fastify"
import { handleRegister } from "../controller/user/register"
import { handleAuthenticate } from "../controller/authenticate"

export const apiRoutes = async (app: FastifyInstance) => {
	app.post("/users", handleRegister)
	app.post("/sessions", handleAuthenticate)
}
