/* eslint-disable jsx-a11y/anchor-is-valid */
import BsmScrollPanel from '../../../../common/components/scroll-panel/bsm-scroll-panel'
import {useWindowSize} from '../../../../common/hooks/useWindowSize'
import {ICalendarNotification} from '../../../../redux/schemas/CalendarNotification'
import CalendarNotificationDialogSection from '../section/calendar-notifcation-dialog-section'

interface ICalendarNotificationDialogContent {
    selectedNotification: ICalendarNotification
    dialogContentHeight: number
}

const CalendarNotificationDialogContent: React.FC<ICalendarNotificationDialogContent> = props => {
    const {selectedNotification, dialogContentHeight} = props
    const windowSize = useWindowSize()

    const DialogRightContent: React.FC = () => {
        return (
            <div className="d-flex flex-column">
                <CalendarNotificationDialogSection
                    buttonContent="test12"
                    content="test12"
                    buttonLinkAction={() => {}}
                    key="section-1"
                    title="test"
                />
                <div className="pt-5" />
                <CalendarNotificationDialogSection
                    buttonContent="cos"
                    content="cos"
                    buttonLinkAction={() => {}}
                    key="section-2"
                    title="cos"
                />
            </div>
        )
    }

    return (
        <div className="container-fluid p-0">
            <div className="row">
                <div className="col-8">
                    <BsmScrollPanel
                        elementId="descScrollPanel"
                        children={props.selectedNotification?.Description}
                        scrollHeight={windowSize.height * (dialogContentHeight / 100)}
                    />
                </div>
                <div className="col">
                    <BsmScrollPanel
                        elementId="rightScrollPanel"
                        children={<DialogRightContent />}
                        scrollHeight={windowSize.height * (dialogContentHeight / 100)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CalendarNotificationDialogContent
