import {combineReducers} from "redux";
import songsSlice from "./songsSlice.ts";

export interface rootState {
    songs: any;
}

export const rootReducer = combineReducers<rootState>({
    songs: songsSlice,
});

export type RootState = ReturnType<typeof rootReducer>