import { app } from "~/app"
import { prisma } from "../database"

const handleGracefulShutdown = async () => {
	let exitCode = 0
	try {
		await prisma.$disconnect()
		await app.close()
	} catch (error) {
		exitCode = 1
		app.log.error(error)
	}
	process.exit(exitCode)
}

process.on("SIGTERM", handleGracefulShutdown)
process.on("SIGINT", handleGracefulShutdown)
