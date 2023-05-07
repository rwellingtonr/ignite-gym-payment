declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string
			NODE_END: "production" | "development"
			JWT_SECRET?: string
			DATABASE_URL: string
		}
	}
}
export {}
