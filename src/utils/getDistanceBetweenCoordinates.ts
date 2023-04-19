export interface CoordinatesProps {
	latitude: number
	longitude: number
}

export const getDistanceBetweenCoordinates = (from: CoordinatesProps, to: CoordinatesProps) => {
	if (from.latitude === to.latitude && from.longitude === to.longitude) {
		return 0
	}
	// Converte para radianos
	// (Pi * num) / 180
	const fromRadian = (Math.PI * from.latitude) / 180
	const toRadian = (Math.PI * to.latitude) / 180
	// Angulo Theta e seu valor em radianos
	const theta = from.longitude - to.longitude
	const radTheta = (Math.PI * theta) / 180

	// sin A * sin B + cos A * cons B * cos Theta
	const sin = Math.sin(fromRadian) * Math.sin(toRadian)
	const cos = Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

	let dist = sin + cos

	if (dist > 1) {
		dist = 1
	}

	dist = Math.acos(dist)
	dist = (dist * 180) / Math.PI
	dist = dist * 60 * 1.1515
	dist = dist * 1.609344

	return dist
}
