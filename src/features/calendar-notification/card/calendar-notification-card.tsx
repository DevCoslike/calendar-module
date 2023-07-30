import './calendar-notification-card.scss'

import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {BsmDialog} from '../../../common/components/dialog/bsm-dialog'
import {ErrorLoadingFailed} from '../../../common/components/error-loading/error-loading-failed'
import {BsmListBox} from '../../../common/components/listbox/bsm-listbox'
import {DIALOG_CONTENT_HEIGHT, DIALOG_HEADER_HEIGHT} from '../../../common/constants/componentStyle'
import {getTimeDifference, sortByDateAttribute} from '../../../common/utils/date-utils'
import {RootState} from '../../../redux/reducers/reducers'
import {ICalendarNotification} from '../../../redux/schemas/CalendarNotification'
import CalendarNotificationDialogContent from '../dialog/content/calendr-notification-dialog-content'
import CalendarNotificationDialogHeader from '../dialog/header/calendar-notification-dialog-header'

export const CalendarNotificationCard: React.FC = () => {
    const [selectedNotification, setSelectedNotification] = useState<ICalendarNotification | null>()
    const [visible, setVisible] = useState<boolean>(false)
    useEffect(() => {
        console.log(selectedNotification)
    }, [selectedNotification])

    const {data, loading, error} = useSelector((state: RootState) => state.posts)

    const dataArr: ICalendarNotification[] = data?.value ?? []
    const items = sortByDateAttribute(dataArr, 'EventStartDate').map((item: ICalendarNotification) => {
        const lblDisplay = item.Title + ' - ' + getTimeDifference(item.EventStartDate)

        return {label: lblDisplay, value: item}
    })

    if (loading === 'failed') {
        return <ErrorLoadingFailed error={error ?? ''} />
    }

    return loading === 'succeeded' ? (
        <div className="calendar-notification-card-wrapper">
            <div className="container-fluid py-1">
                <div className="row">
                    <h2>
                        <i className="pi pi-calendar pe-1 h2i" />
                        Upcoming Events
                    </h2>
                </div>
                <div className="row">
                    <BsmListBox
                        elementId="lsBoxItems"
                        options={items}
                        onClick={() => setVisible(true)}
                        onChange={e => setSelectedNotification(e.value)}
                        style={{maxWidth: '380px'}}
                        listStyle={{maxHeight: '230px'}}
                    />
                </div>
            </div>
            {selectedNotification && (
                <BsmDialog
                    visible={visible}
                    appendTo={document.body}
                    focusOnShow={false}
                    closeOnEscape={true}
                    onHide={() => setVisible(false)}
                    closable={true}
                    elementId="BSMDialog"
                    header={
                        <CalendarNotificationDialogHeader
                            selectedNotification={selectedNotification}
                            dialogHeaderHeight={DIALOG_HEADER_HEIGHT}
                        />
                    }
                    draggable={false}
                >
                    <CalendarNotificationDialogContent
                        selectedNotification={selectedNotification}
                        dialogContentHeight={DIALOG_CONTENT_HEIGHT}
                    />
                </BsmDialog>
            )}
        </div>
    ) : (
        <></>
    )
}
