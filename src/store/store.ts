import {configureStore} from '@reduxjs/toolkit'
import {rootReducer} from "./reducers";
import {tracksApi} from "../api/tracks.api.ts";
import thunk from "redux-thunk";
import {authApi} from "../api/auth.api.ts";

export const store = configureStore({
    reducer: {
        songs: rootReducer,
        [tracksApi.reducerPath]: tracksApi.reducer,
        [authApi.reducerPath]: authApi.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, tracksApi.middleware, authApi.middleware),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
