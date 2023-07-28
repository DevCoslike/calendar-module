import './App.css'

import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import logo from './logo.svg'
import {fetchPosts} from './redux/reducers/postsSlice'
import {RootState} from './redux/reducers/reducers'
import {ICalendarNotification} from './redux/schemas/CalendarNotification'

function App() {
    const {data, loading, error} = useSelector((state: RootState) => state.posts)
    const dataArr: ICalendarNotification[] = data?.value ?? []
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    if (loading === 'pending') {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
            <div>
                {dataArr.map(post => (
                    <div key={post.ID}>
                        <h2>{post.Author}</h2>
                        <p>{post.City}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App
