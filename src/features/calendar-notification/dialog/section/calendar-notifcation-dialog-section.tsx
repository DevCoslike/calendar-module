/* eslint-disable jsx-a11y/anchor-is-valid */
interface ICalendarNotificationDialogSection {
    title: string
    content: string
    buttonLinkAction: () => void
    buttonContent: string
}
const CalendarNotificationDialogSection: React.FC<ICalendarNotificationDialogSection> = props => {
    return (
        <div className="container p-0">
            <div className="row">
                <h2>{props.title.toUpperCase()}</h2>
            </div>
            <div className="row pt-2">
                <p dangerouslySetInnerHTML={{__html: props.content?.toString() ?? ''}} />
            </div>
            <div className="row p-0">
                <a href="#" onClick={props.buttonLinkAction}>
                    {props.buttonContent}
                </a>
            </div>
        </div>
    )
}

export default CalendarNotificationDialogSection
