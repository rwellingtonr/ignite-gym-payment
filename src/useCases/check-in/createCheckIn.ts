import { CheckIn } from "@prisma/client"
import { ICheckInRepository } from "~/infra/repository/check-in/interface"

interface CreateCheckInRequest {
	userId: string
	gymId: string
}

interface CreateCheckInResponse {
	checkIn: CheckIn
}

export class CreateCheckInService {
	constructor(private readonly checkInRepository: ICheckInRepository) {}

	async execute({ gymId, userId }: CreateCheckInRequest): Promise<CreateCheckInResponse> {
		const checkIn = await this.checkInRepository.create({
			gymId,
			userId,
		})

		return { checkIn }
	}
}
