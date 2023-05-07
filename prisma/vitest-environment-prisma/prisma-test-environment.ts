import "dotenv/config"
import { randomUUID } from "node:crypto"
import { execSync } from "node:child_process"
import type { Environment } from "vitest"
import { PrismaClient } from "@prisma/client"

const prismaClient = new PrismaClient()

async function deleteDataBaseSchema(schema: string) {
	await prismaClient.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
	await prismaClient.$disconnect()
}

function generateDBUrl(nameSchema: string) {
	const databaseUrl = process.env.DATABASE_URL

	if (!databaseUrl) {
		throw new Error("Please provide de database url!")
	}

	const url = new URL(databaseUrl)
	url.searchParams.set("schema", nameSchema)

	return url.toString()
}

export default <Environment>{
	name: "prisma",
	async setup() {
		const schemaName = randomUUID()
		const databaseUrl = generateDBUrl(schemaName)

		process.env.DATABASE_URL = databaseUrl

		execSync("npx prisma migrate deploy")

		return {
			async teardown() {
				await deleteDataBaseSchema(schemaName)
			},
		}
	},
}
