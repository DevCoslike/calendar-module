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

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.post<ICalendarNotification[]>(
        'https://prod-179.westeurope.logic.azure.com/workflows/7c84997dd6894507a60796acb06e5c43/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6hFoizfo2w62d0iQK_Zyt7a3Ycr9akAkXdCPAG0ecwQ&usr=4b6f6e7374616e74696e6f7341'
    ) // Replace with your actual API endpoint
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
