import {DateArray, EventAttributes, createEvent} from 'ics'

export function generateICS(startDate: Date, days: number, title: string, location: string) {
    const event: EventAttributes = {
        start: dateToArray(startDate),
        duration: {days: days},
        title: title,
        location: location,
    }

    const {error, value} = createEvent(event)
    if (error) {
        console.error('Error generating ICS file:', error)
        return ''
    }

    return value
}

function dateToArray(date: Date): DateArray {
    return [
        date.getFullYear(),
        date.getMonth() + 1, // Month is 0-indexed, so we add 1 to get the correct month.
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
    ]
}
