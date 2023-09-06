import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const songsSlice = createSlice({
    name: 'song',
    initialState: {
        songs: []
    },
    reducers: {
        fetchSongs: (state: any, action: PayloadAction) => {
            state.songs = action.payload
        }
    }
})
export const {fetchSongs} = songsSlice.actions
export default songsSlice.reducer
