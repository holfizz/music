import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:4000/auth/"}),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body
            }),
        }),
        registration: builder.mutation({
            query: (body) => ({
                url: 'registration',
                method: 'POST',
                body
            }),
        }),

    }),
})

export const {useLoginMutation, useRegistrationMutation} = authApi