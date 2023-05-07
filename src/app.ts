import "~/infra/middleware/gracefulShutdown"
import fastify, { FastifyReply, FastifyRequest } from "fastify"
import * as Routes from "./presentation/routes"
import { handleError } from "./helpers/errors/errorHandler"
import { environment } from "./config/env"
import cors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt"
import helmet from "@fastify/helmet"

const loggerType = {
	production: true,
	development: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "hostname",
			},
		},
		serializers: {
			res(reply: FastifyReply) {
				return {
					statusCode: reply.statusCode,
				}
			},
			req(req: FastifyRequest) {
				return {
					method: req.method,
					url: req.url,
				}
			},
		},
	},
}

export const app = fastify({
	logger: loggerType[environment.nodeEnv],
})

app.register(helmet)
app.register(cors)
app.register(fastifyJwt, { secret: environment.jwtSecret })

for (const key in Routes) {
	app.register(Routes[key], { prefix: "/api" })
}

app.setErrorHandler(handleError)
