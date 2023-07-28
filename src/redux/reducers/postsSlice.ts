import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

import {ICalendarNotification} from '../schemas/CalendarNotification'

interface PostsState {
    data: ICalendarNotification[] | any
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: PostsState = {
    data: [],
    loading: 'idle',
    error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (apiEndpoint: string) => {
    const response = await axios.post<ICalendarNotification[]>(apiEndpoint)
    return response.data
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, state => {
                state.loading = 'pending'
                state.error = null
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<ICalendarNotification[]>) => {
                state.loading = 'succeeded'
                state.data = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = 'failed'
                state.error = action.error.message || 'Failed to fetch posts.'
            })
    },
})

export default postsSlice.reducer
