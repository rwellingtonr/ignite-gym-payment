import { ICheckInRepository } from "~/infra/repository/check-in/interface"

interface GetUserMetricsRequest {
	userId: string
}

interface GetUserMetricsResponse {
	countCheckIns: number
}

export class GetUserMetricsService {
	constructor(private readonly checkInRepository: ICheckInRepository) {}

	async execute({ userId }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
		const countCheckIns = await this.checkInRepository.countByUserId(userId)

		return { countCheckIns }
	}
}
