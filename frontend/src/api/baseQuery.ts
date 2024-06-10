import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import Cookies from 'js-cookie'
import { EnvConfig } from '../config'

export const baseQuery = fetchBaseQuery({
    baseUrl: EnvConfig.apiBaseURL,
    prepareHeaders: (headers) => {
        const loginToken = Cookies.get('loginToken')
        if (loginToken) {
            headers.set('x-login-token', loginToken)
        }

        headers.set('Access-Control-Allow-Origin', '*')
        return headers
    },
})
