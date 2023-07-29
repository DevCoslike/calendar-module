import './calendar-notification-card.scss'

import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {BsmListBox} from '../../common/components/listbox/bsm-listbox'
import {CALENDAR_NOTIFICATION_API_ENDPOINT} from '../../common/constants/apiURLs'
import {fetchPosts} from '../../redux/reducers/postsSlice'
import {RootState} from '../../redux/reducers/reducers'
import {ICalendarNotification} from '../../redux/schemas/CalendarNotification'

export const CalendarNotificationCard = () => {
    //todo add toast
    // const {data, loading, error} = useSelector((state: RootState) => state.posts)
    // const dataArr: ICalendarNotification[] = data?.value ?? []
    // const dispatch = useDispatch<any>()
    const items = Array.from({length: 100000}).map((_, i) => ({label: `Item #${i}`, value: i}))
    // useEffect(() => {
    //     dispatch(fetchPosts(CALENDAR_NOTIFICATION_API_ENDPOINT))
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(fetchPosts(CALENDAR_NOTIFICATION_API_ENDPOINT))
    // }, [])

    // if (loading === 'pending') {
    //     return <p>Loading...</p>
    // }

    return (
        <div className="calendar-notification-card-wrapper">
            <h5>Virtual Scroll (100000 Items)</h5>
            <BsmListBox
                elementId="lsBoxItems"
                options={items}
                virtualScrollerOptions={{itemSize: 38}}
                //onChange={e => setSelectedItem(e.value)}
                style={{width: '15rem'}}
                listStyle={{height: '250px'}}
            />
        </div>
    )
}
