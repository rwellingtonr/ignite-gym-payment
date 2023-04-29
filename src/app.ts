import fastify from "fastify"
import { apiRoutes } from "./presentation/routes"
import { handleError } from "./helpers/errors/errorHandler"
import cors from "@fastify/cors"
import fastifyJwt from "@fastify/jwt"
import helmet from "@fastify/helmet"

import "~/infra/middleware/gracefulShutdown"
import { environment } from "./config/env"

export const app = fastify({
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "hostname",
			},
		},
		serializers: {
			res(reply) {
				return {
					statusCode: reply.statusCode,
				}
			},
			req(req) {
				return {
					method: req.method,
					url: req.url,
				}
			},
		},
	},
})

app.register(helmet)
app.register(cors)
app.register(fastifyJwt, { secret: environment.jwtSecret })

app.register(apiRoutes, { prefix: "/api" })

app.setErrorHandler(handleError)
