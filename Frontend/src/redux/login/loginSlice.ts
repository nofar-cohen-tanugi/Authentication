// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginForm } from '../../models/login/ILoginForm.model'

export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (build) => ({
        login: build.mutation<ILoginForm, Partial<ILoginForm>>({
            query(body) {
                return {
                    url: `https://private-052d6-testapi4528.apiary-mock.com/authenticate`,
                    method: 'POST',
                    body,
                }
            }
        })
    }),
})

export const {
    useLoginMutation
} = loginApi