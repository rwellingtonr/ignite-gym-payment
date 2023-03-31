import { FastifyInstance } from "fastify";
import { handleRegister } from "../controller/user/register";

export const apiRoutes = async (app: FastifyInstance) => {
	app.post("/users", handleRegister);
};
