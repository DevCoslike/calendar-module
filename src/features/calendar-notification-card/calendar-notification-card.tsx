import './calendar-notification-card.scss'

import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

import {ErrorLoadingFailed} from '../../common/components/error-loading/error-loading-failed'
import {BsmListBox} from '../../common/components/listbox/bsm-listbox'
import {getTimeDifference, sortByDateAttribute} from '../../common/utils/date-utils'
import {RootState} from '../../redux/reducers/reducers'
import {ICalendarNotification} from '../../redux/schemas/CalendarNotification'

export const CalendarNotificationCard = () => {
    const [selectedItem, setSelectedItem] = useState<ICalendarNotification | null>()
    useEffect(() => {
        console.log(selectedItem)
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
        </div>
    ) : (
        <></>
    )
}
