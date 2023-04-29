import dayjs from "dayjs"

export const getStartAndEndDate = (date: string | Date) => {
	const startOfTheDay = dayjs(date).startOf("date").toDate()
	const endOfTheDay = dayjs(date).endOf("date").toDate()

	return {
		startOfTheDay,
		endOfTheDay,
	}
}

export const getDiffTimeInMinutes = (date: string | Date) => {
	const diff = dayjs(new Date()).diff(date, "minutes")
	return diff
}
