import {configureStore} from '@reduxjs/toolkit'
import {rootReducer} from "./reducers";
import {tracksApi} from "../api/tracks.api.ts";
import thunk from "redux-thunk";

export const store = configureStore({
    reducer: {
        auth: rootReducer,
        [tracksApi.reducerPath]: tracksApi.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, tracksApi.middleware),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
