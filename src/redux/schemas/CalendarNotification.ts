export interface ICalendarNotification {
    ID: number
    Title: string
    Category: string
    BannerUrl: string
    Description: string
    AddressLine1: string
    AddressLine2: string
    PostCode: string
    City: string
    Country: string
    EventStartDate: string
    EventEndDate: string
    FullDayEvent: string
    Author: string
    Editor: string
    Created: string
    Modified: string
    [key: string]: any
}
