import {ICalendarNotification} from '../../redux/schemas/CalendarNotification'

function formatDateToDDMMYYYY(inputDateStr: string): string {
    const inputDate = new Date(inputDateStr)
    const day = inputDate.getUTCDate().toString().padStart(2, '0')
    const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = inputDate.getUTCFullYear().toString()
    return `${day}/${month}/${year}`
}

export function getTimeDifference(inputDateStr: string): string {
    const inputDate = new Date(inputDateStr)
    const currentDate = new Date()

    const timeDifference = inputDate.getTime() - currentDate.getTime()

    const msPerDay = 24 * 60 * 60 * 1000 // Number of milliseconds in a day
    const msPerHour = 60 * 60 * 1000 // Number of milliseconds in an hour

    if (timeDifference > 0) {
        // check in how many days range
        if (timeDifference <= 3 * msPerDay) {
            // Calculate the number of days
            const daysDifference = Math.ceil(timeDifference / msPerDay)
            return `in ${daysDifference} day${daysDifference === 1 ? '' : 's'}`
        } else if (timeDifference <= msPerDay) {
            // Calculate the number of hours
            const hoursDifference = Math.ceil(timeDifference / msPerHour)
            return `in ${hoursDifference} hour${hoursDifference === 1 ? '' : 's'}`
        }
    }

    return formatDateToDDMMYYYY(inputDateStr)
}

function isValidDate(dateStr: string): boolean {
    const date = new Date(dateStr)
    return date instanceof Date && !isNaN(date.getTime())
}

export function sortByDateAttribute(arr: ICalendarNotification[], dateAttributeName: string): ICalendarNotification[] {
    const sortedArray = [...arr] // Create a copy of the original array to avoid modifying it

    // Check if the date attribute exists in the first object of the array
    const firstObject = sortedArray[0]
    if (!firstObject || !(dateAttributeName in firstObject)) {
        // Date attribute not found in the first object, return the original array
        return sortedArray
    }

    // Filter out objects with invalid date attributes
    const filteredArray = sortedArray.filter(obj => dateAttributeName in obj && isValidDate(obj[dateAttributeName]))

    // Custom comparison function to sort by the specified date attribute
    const compareDates = (a: ICalendarNotification, b: ICalendarNotification) => {
        const dateA = new Date(a[dateAttributeName]).getTime()
        const dateB = new Date(b[dateAttributeName]).getTime()
        return dateA - dateB // Sort in ascending order
    }

    // Sort the array based on the date attribute
    filteredArray.sort(compareDates)

    return filteredArray
}