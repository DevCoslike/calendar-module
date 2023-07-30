/* eslint-disable jsx-a11y/anchor-is-valid */
interface ICalendarNotificationDialogSection {
    title: string
    content: string
    buttonLinkAction: () => void
    buttonContent: string
}
const CalendarNotificationDialogSection: React.FC<ICalendarNotificationDialogSection> = props => {
    return (
        <div className="container">
            <div className="row">
                <h2>{props.title.toUpperCase()}</h2>
            </div>
            <div className="row py-2">
                <p>{props.content}</p>
            </div>
            <div className="row">
                <a href="#" onClick={props.buttonLinkAction}>
                    {props.buttonContent}
                </a>
            </div>
        </div>
    )
}

export default CalendarNotificationDialogSection
