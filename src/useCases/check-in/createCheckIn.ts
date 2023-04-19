import { CheckIn } from "@prisma/client"
import { makeError } from "~/helpers/errors"
import { ICheckInRepository } from "~/infra/repository/check-in/interface"
import { IGymRepository } from "~/infra/repository/gym/interface"
import { getDistanceBetweenCoordinates } from "~/utils/getDistanceBetweenCoordinates"

interface CreateCheckInRequest {
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
}

interface CreateCheckInResponse {
	checkIn: CheckIn
}

export class CreateCheckInService {
	constructor(
		private readonly checkInRepository: ICheckInRepository,
		private readonly gymRepository: IGymRepository,
	) {}

	async execute({
		gymId,
		userId,
		userLatitude,
		userLongitude,
	}: CreateCheckInRequest): Promise<CreateCheckInResponse> {
		const gym = await this.gymRepository.findById(gymId)

		if (!gym) {
			const Error404 = makeError("404", "Could not find this gym")
			throw new Error404()
		}

		const calculateDistances = {
			from: {
				longitude: userLongitude,
				latitude: userLatitude,
			},
			to: {
				longitude: gym.longitude.toNumber(),
				latitude: gym.latitude.toNumber(),
			},
		}

		const distance = getDistanceBetweenCoordinates(calculateDistances.from, calculateDistances.to)

		const maxDistanceInKilometers = 0.1

		if (distance > maxDistanceInKilometers) {
			const Error400 = makeError("400", "Exceed the maximum distance")
			throw new Error400()
		}

		const isThereACheckIn = await this.checkInRepository.findByUserIdOnData(userId, new Date())

		if (isThereACheckIn) {
			const Error409 = makeError("409", "Not allowed twice check-ins on the same day")
			throw new Error409()
		}

		const checkIn = await this.checkInRepository.create({
			gymId,
			userId,
		})

		return { checkIn }
	}
}
