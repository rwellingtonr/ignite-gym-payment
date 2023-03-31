import createError from "@fastify/error"

type ErrorCode = "400" | "401" | "403" | "404" | "409"

export function makeError(code: ErrorCode, message: string) {
	const CustomError = createError(code, message)
	throw new CustomError()
}
