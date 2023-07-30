import {ICalendarNotification} from '../../redux/schemas/CalendarNotification'

const DAYS_FRIENDLY_MSG_THRESHOLD = 7

function formatDateToDDMMYYYY(inputDateStr: string): string {
    const inputDate = new Date(inputDateStr)
    const day = getDayFromDate(inputDateStr)
    const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = inputDate.getUTCFullYear().toString()
    return `${day}/${month}/${year}`
}

/**
 * this getTimeDifference is responsible for consuming a date format and produce a user friendly output
 * @param inputDateStr date format to string
 * @returns a string of a date or a message with time description
 */
export function getTimeDifference(inputDateStr: string): string {
    const inputDate = new Date(inputDateStr)
    const currentDate = new Date()

    const timeDifference = inputDate.getTime() - currentDate.getTime()

    const msPerDay = 24 * 60 * 60 * 1000 // Number of milliseconds in a day
    const msPerHour = 60 * 60 * 1000 // Number of milliseconds in an hour

    if (timeDifference > 0) {
        // check in how many days range
        if (timeDifference <= DAYS_FRIENDLY_MSG_THRESHOLD * msPerDay) {
            // Calculate the number of days
            const daysDifference = Math.ceil(timeDifference / msPerDay)
            return `in ${daysDifference} day${daysDifference === 1 ? '' : 's'}`
        } else if (timeDifference <= msPerDay) {
            // Calculate the number of hours
            const hoursDifference = Math.ceil(timeDifference / msPerHour)
            return `in ${hoursDifference} hour${hoursDifference === 1 ? '' : 's'}`
        }
    } else if (inputDate.getTime() < currentDate.getTime()) {
        return `${formatDateToDDMMYYYY(inputDateStr)} (pass date)`
    }

    return formatDateToDDMMYYYY(inputDateStr)
}

function isValidDate(dateStr: string): boolean {
    const date = new Date(dateStr)
    return date instanceof Date && !isNaN(date.getTime())
}

/**
 * sortByDateAttribute is responsible to sort our notification in ascending order pass to future
 * @param arr this is an array of objects type ICalendarNotification
 * @param dateAttributeName
 * @returns sorted array of objects type ICalendarNotification
 */
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

export function getDayFromDate(inputDateStr: string): string {
    // Create a Date object from the formatted date string
    const inputDSate = new Date(inputDateStr)

    // Get the day of the month (1 to 31)
    const day = inputDSate.getUTCDate().toString().padStart(2, '0')

    return day
}

function getAbbreviatedDayName(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {weekday: 'short'})
}

export function getMonthAbbreviation(inputDateStr: string, toUpperCase: boolean = true): string {
    // Create a Date object from the formatted date string
    const date = new Date(inputDateStr)

    // Get the month abbreviation (e.g., "FEB") using Intl.DateTimeFormat
    const monthAbbreviation = new Intl.DateTimeFormat('en', {month: 'short'}).format(date)

    return toUpperCase ? monthAbbreviation.toUpperCase() : monthAbbreviation
}
function formatDateToDateAndTime(inputDateStr: string, fullDayEvent: boolean = false): string {
    const inputDate = new Date(inputDateStr)
    const day = getDayFromDate(inputDateStr)
    const year = inputDate.getUTCFullYear().toString()
    return `${getAbbreviatedDayName(inputDateStr)}, ${day} ${getMonthAbbreviation(inputDateStr, false)} ${year} ${
        fullDayEvent ? ' - Full Day Event' : ''
    }`
}
export function getAllDatesInRangeWithLineBreak(
    startDateStr: string,
    endDateStr: string,
    fullDayEvent: boolean = false
): string {
    if (!isValidDate(startDateStr) || !isValidDate(startDateStr)) {
        return 'N/A date range'
    }

    const datesInRange: string[] = []
    const currentDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)

    while (currentDate <= endDate) {
        datesInRange.push(`${formatDateToDateAndTime(currentDate.toISOString(), fullDayEvent)}</br>`)
        currentDate.setDate(currentDate.getDate() + 1)
    }

    return datesInRange.join('')
}
