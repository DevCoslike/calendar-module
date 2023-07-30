import BsmImage from '../../../../common/components/image/bsm-image'
import {useWindowSize} from '../../../../common/hooks/useWindowSize'
import {getDayFromDate, getMonthAbbreviation} from '../../../../common/utils/date-utils'
import {ICalendarNotification} from '../../../../redux/schemas/CalendarNotification'

interface ICalendarNotificationDialogHeader {
    selectedNotification: ICalendarNotification
    dialogHeaderHeight: number
}
export const CalendarNotificationDialogHeader: React.FC<ICalendarNotificationDialogHeader> = props => {
    const {EventStartDate, Title, Category, BannerUrl} = props.selectedNotification
    const windowSize = useWindowSize()
    const getPercentageHeight = () => {
        return windowSize.height * (props.dialogHeaderHeight / 100)
    }

    return (
        <div className="calendar-notification-dialog-header-wrapper" style={{maxHeight: getPercentageHeight()}}>
            <div className="row px-3">
                {BannerUrl && (
                    <div className="col-8">
                        <BsmImage imageUrl={BannerUrl} maxHeightImgContainer={getPercentageHeight()} />
                    </div>
                )}
                <div className="col header-content">
                    <div style={{height: getPercentageHeight()}} className="d-flex flex-column justify-content-between">
                        <div className="d-flex align-items-start flex-column fw-normal fs-5 pt-1">
                            <div className="p-0">{getMonthAbbreviation(EventStartDate)}</div>
                            <div className="p-0" style={{marginTop: '-10px'}}>
                                {getDayFromDate(EventStartDate)}
                            </div>
                        </div>
                        <div className="d-flex align-items-center ">
                            <div className="align-self-center fs-4">{Title}</div>
                        </div>
                        <div className="d-flex align-items-end">
                            <div className="align-self-end fw-normal fs-6">{Category}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
