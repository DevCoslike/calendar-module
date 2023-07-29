import './styles/base-theme.scss'

import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {CALENDAR_NOTIFICATION_API_ENDPOINT} from './common/constants/apiURLs'
import logo from './logo.svg'
import {fetchPosts} from './redux/reducers/postsSlice'

function App() {
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(fetchPosts(CALENDAR_NOTIFICATION_API_ENDPOINT))
    }, [dispatch])
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default App
