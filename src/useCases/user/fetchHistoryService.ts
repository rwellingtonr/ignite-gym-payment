import { CheckIn } from "@prisma/client"
import { ICheckInRepository } from "~/infra/repository/check-in/interface"

interface FetchHistoryRequest {
	userId: string
	page: number
}

interface FetchHistoryResponse {
	checkIn: CheckIn[]
}

export class FetchHistoryService {
	constructor(private readonly checkInRepository: ICheckInRepository) {}

	async execute({ userId, page }: FetchHistoryRequest): Promise<FetchHistoryResponse> {
		const checkIn = await this.checkInRepository.findManyByUserId(userId, page)

		return { checkIn }
	}
}
