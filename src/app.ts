import fastify from "fastify"
import { apiRoutes } from "./presentation/routes"

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

app.register(apiRoutes)
