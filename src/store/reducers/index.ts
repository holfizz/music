import {combineReducers} from "redux";
import songsSlice, {songsSliceProps} from "./songsSlice.ts";

export interface rootState {
    songs: songsSliceProps;
}

export const rootReducer = combineReducers<rootState>({
    songs: songsSlice,
});

export type RootState = ReturnType<typeof rootReducer>