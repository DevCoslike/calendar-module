import BsmImage from '../../../../common/components/image/bsm-image'
import {useWindowSize} from '../../../../common/hooks/useWindowSize'
import {ICalendarNotification} from '../../../../redux/schemas/CalendarNotification'

interface ICalendarNotificationDialogHeader {
    selectedNotification: ICalendarNotification
}
export const CalendarNotificationDialogHeader: React.FC<ICalendarNotificationDialogHeader> = props => {
    const {EventStartDate, Title, Category, BannerUrl} = props.selectedNotification
    const windowSize = useWindowSize()

    return (
        <div className="calendar-notification-dialog-header-wrapper" style={{maxHeight: windowSize.height * 0.25}}>
            <div className="row">
                {BannerUrl && (
                    <div className="col-8">
                        <BsmImage imageUrl={BannerUrl} maxHeightImgContainer={windowSize.height * 0.25} />
                    </div>
                )}
                <div className="col header-content">
                    <div
                        style={{height: windowSize.height * 0.25}}
                        className="d-flex flex-column justify-content-between"
                    >
                        <div className="d-flex align-items-start small-date">
                            <div className="p-2">{EventStartDate}</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="align-self-center text-center">{Title}</div>
                        </div>
                        <div className="d-flex align-items-end">
                            <div className="align-self-end small-content">{Category}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
