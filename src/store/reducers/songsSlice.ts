import {createSlice} from "@reduxjs/toolkit";
import {ITrack} from "../../interfaces/track.interface.ts";

export interface songsSliceProps {
    a: boolean,
    previousSong: ITrack | null
    currentSong: ITrack | null
    nextSong: ITrack | null
}

const songsSlice = createSlice({
    name: "songs",
    initialState: {
        a: false,
        previousSong: localStorage.getItem('previousSong') ? JSON.parse(localStorage.getItem('previousSong') || '') : null,
        currentSong: localStorage.getItem('currentSong') ? JSON.parse(localStorage.getItem('currentSong') || '') : null,
        nextSong: localStorage.getItem('nextSong') ? JSON.parse(localStorage.getItem('nextSong') || '') : null,
    },
    reducers: {
        setPreviousSong: (state, action) => {
            state.previousSong = action.payload;
            if (action.payload) {
                localStorage.setItem('previousSong', JSON.stringify(action.payload))
            }
        },
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
            localStorage.setItem('currentSong', JSON.stringify(action.payload))
        },
        setNextSong: (state, action) => {
            state.nextSong = action.payload;
            if (action.payload) {
                localStorage.setItem('nextSong', JSON.stringify(action.payload))
            }
        },
    },
});

export const {setPreviousSong, setCurrentSong, setNextSong} = songsSlice.actions;
export default songsSlice.reducer;