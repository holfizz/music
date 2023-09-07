import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const tracksApi = createApi({
    reducerPath: 'tracks',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000/'}),
    endpoints: (builder) => ({
        getAllTracks: builder.query({
            query: () => ({
                url: 'tracks',
                method: 'GET'
            }),
        }),
        getAllArtists: builder.query({
            query: () => ({
                url: 'artists',
                method: 'GET'
            }),
        }),
    }),
})

export const {useGetAllTracksQuery, useGetAllArtistsQuery} = tracksApi