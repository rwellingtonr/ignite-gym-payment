import { FastifyListenOptions } from "fastify";
import { app } from "./app";
import { environment } from "./config/env";

const bootstrap = async () => {
	try {
		const serverOptions: FastifyListenOptions = {
			host: "0.0.0.0",
			port: environment.port,
		};

		await app.listen(serverOptions);
		console.log(`🚀 Server started on ${environment.port}`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
bootstrap();
