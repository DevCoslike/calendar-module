/* eslint-disable jsx-a11y/anchor-is-valid */
import BsmScrollPanel from '../../../../common/components/scroll-panel/bsm-scroll-panel'
import {useWindowSize} from '../../../../common/hooks/useWindowSize'
import {getAllDatesInRangeWithLineBreak} from '../../../../common/utils/date-utils'
import {ICalendarNotification} from '../../../../redux/schemas/CalendarNotification'
import CalendarNotificationDialogSection from '../section/calendar-notifcation-dialog-section'

interface ICalendarNotificationDialogContent {
    selectedNotification: ICalendarNotification
    dialogContentHeight: number
}

const CalendarNotificationDialogContent: React.FC<ICalendarNotificationDialogContent> = props => {
    const {selectedNotification, dialogContentHeight} = props
    const {EventStartDate, EventEndDate, FullDayEvent, AddressLine1, Country, AddressLine2, PostCode, City} =
        selectedNotification
    const windowSize = useWindowSize()

    const createAddressString = (): string => {
        const addressParts: string[] = []
        const validString = (strVal): boolean => {
            return typeof strVal === 'string' ? !!(strVal && strVal.trim() !== '') : false
        }

        validString(AddressLine1) && addressParts.push(AddressLine1?.trim())
        validString(AddressLine2) && addressParts.push(AddressLine2?.trim())
        validString(City) && addressParts.push(City?.trim())
        validString(PostCode) && addressParts.push(PostCode?.trim())
        validString(Country) && addressParts.push(Country?.trim())

        const addressString = addressParts.join('</br>')

        return addressString
    }

    return (
        <div className="container-fluid p-0">
            <div className="row">
                {props.selectedNotification?.Description && (
                    <div className="col-8">
                        <BsmScrollPanel
                            elementId="descScrollPanel"
                            children={props.selectedNotification?.Description}
                            scrollHeight={windowSize.height * (dialogContentHeight / 100)}
                        />
                    </div>
                )}
                <div className="col px-0">
                    <BsmScrollPanel
                        elementId="rightScrollPanel"
                        children={
                            <div
                                className={`d-flex flex-column  ${
                                    props.selectedNotification?.Description ? '' : 'text-center'
                                }`}
                            >
                                <CalendarNotificationDialogSection
                                    title="Date and time"
                                    content={getAllDatesInRangeWithLineBreak(
                                        EventStartDate,
                                        EventEndDate,
                                        FullDayEvent === ''
                                    )}
                                    buttonContent="Add to Calendar"
                                    buttonLinkAction={() => {}}
                                    key="section-1"
                                />
                                <div className="pt-4" />
                                <CalendarNotificationDialogSection
                                    title="Location"
                                    content={createAddressString()}
                                    buttonContent="View Map"
                                    buttonLinkAction={() => {}}
                                    key="section-2"
                                />
                            </div>
                        }
                        scrollHeight={windowSize.height * (dialogContentHeight / 100)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CalendarNotificationDialogContent
