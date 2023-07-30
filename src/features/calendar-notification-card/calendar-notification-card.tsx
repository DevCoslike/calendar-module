import './calendar-notification-card.scss'

import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {BsmDialog} from '../../common/components/dialog/bsm-dialog'
import {ErrorLoadingFailed} from '../../common/components/error-loading/error-loading-failed'
import {BsmListBox} from '../../common/components/listbox/bsm-listbox'
import YAxisScroller from '../../common/components/scroller/y-axis-scroller'
import useToggle from '../../common/hooks/useToggle'
import {getTimeDifference, sortByDateAttribute} from '../../common/utils/date-utils'
import {RootState} from '../../redux/reducers/reducers'
import {ICalendarNotification} from '../../redux/schemas/CalendarNotification'

export const CalendarNotificationCard = () => {
    const [selectedItem, setSelectedItem] = useState<ICalendarNotification | null>()
    const [visible, setVisible] = useState<boolean>(false)
    useEffect(() => {
        console.log(selectedItem)
        setVisible(true)
    }, [selectedItem])

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
                        onChange={e => setSelectedItem(e.value)}
                        style={{maxWidth: '380px'}}
                        listStyle={{maxHeight: '230px'}}
                    />
                </div>
            </div>
            <BsmDialog
                visible={visible}
                style={{width: '25vw', minWidth: '305px', minHeight: '105px'}}
                onHide={() => setVisible(false)}
                closable={true}
                elementId="BSM"
                header="My dialog"
                modal={true}
            >
                <YAxisScroller children={selectedItem?.Description} elementId="bsm-scroller" scrollHeight={105} />
            </BsmDialog>
        </div>
    ) : (
        <></>
    )
}
