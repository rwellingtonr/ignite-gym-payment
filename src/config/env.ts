import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
	const message = "❌ Invalid environment variables";
	console.error(message);
	throw new Error(message);
}

export const environment = {
	port: env.data.PORT,
	nodeEnv: env.data.NODE_ENV,
};
