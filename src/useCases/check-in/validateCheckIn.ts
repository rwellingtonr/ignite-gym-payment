import { CheckIn } from "@prisma/client"
import dayjs from "dayjs"
import { makeError } from "~/helpers/errors"
import { ICheckInRepository } from "~/infra/repository/check-in/interface"
import { IGymRepository } from "~/infra/repository/gym/interface"

interface ValidateCheckInRequest {
	checkInId: string
}

interface ValidateCheckInResponse {
	checkIn: CheckIn
}

export class ValidateCheckInService {
	constructor(private readonly checkInRepository: ICheckInRepository) {}

	async execute({ checkInId }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
		const checkIn = await this.checkInRepository.findById(checkInId)

		if (!checkIn) {
			const Error404 = makeError("404", "Could not find this check-in")
			throw new Error404()
		}

		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.createdAt,
			"minutes",
		)

		if (distanceInMinutesFromCheckInCreation > 20) {
			const Error403 = makeError("403", "Check-in can only be validated within 20 minutes")
			throw Error403
		}

		checkIn.validatedAt = new Date()
		const checkInUpdated = await this.checkInRepository.update(checkIn)

		return { checkIn: checkInUpdated }
	}
}
