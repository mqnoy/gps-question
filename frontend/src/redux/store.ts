import { configureStore } from '@reduxjs/toolkit'
import { userApi, gpsApi } from '../api'
import { authApi } from '../api/authApi'

export const store = configureStore({
    reducer: {
        [gpsApi.reducerPath]: gpsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, gpsApi.middleware, authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
