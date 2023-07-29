import './calendar-notification-card.scss'

import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {BsmListBox} from '../../common/components/listbox/bsm-listbox'
import {RootState} from '../../redux/reducers/reducers'
import {ICalendarNotification} from '../../redux/schemas/CalendarNotification'

export const CalendarNotificationCard = () => {
    //todo add toast
    const {data, loading, error} = useSelector((state: RootState) => state.posts)

    const dataArr: ICalendarNotification[] = data?.value ?? []
    const items = dataArr.map(item => ({label: item.Title, value: item}))

    if (loading === 'pending') {
        return <p>Loading...</p>
    }

    return (
        <div className="calendar-notification-card-wrapper">
            <h2>Virtual Scroll (100000 Items)</h2>
            <BsmListBox
                elementId="lsBoxItems"
                options={items}
                //onChange={e => setSelectedItem(e.value)}
                style={{width: '15rem'}}
                listStyle={{height: '250px'}}
            />
        </div>
    )
}
