import type { Environment } from "vitest"

export default <Environment>{
	name: "prisma",
	async setup() {
		// custom setup
		console.log("My Custom Environment")

		return {
			teardown() {
				// called after all tests with this env have been run
			},
		}
	},
}
