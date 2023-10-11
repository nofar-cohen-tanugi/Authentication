// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginForm } from '../../models/login/ILoginForm.model'
import { ILoginResponse } from '../../models/login/ILoginResponse.model'
import { RootState } from '../store'

export const loginApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).authSlice.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse[], ILoginForm>({
      query: (credentials) => ({
        url: `https://private-052d6-testapi4528.apiary-mock.com/authenticate`,
        method: 'POST',
        body: credentials,
      }),
    })
  }),
})

export const { useLoginMutation } = loginApi
