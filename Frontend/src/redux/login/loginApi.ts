import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginForm } from '../../models/login/ILoginForm.model'
import { ILoginDto } from '../../models/login/ILoginResponse.model';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/'
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginDto, ILoginForm>({
      query: (credentials) => ({
        url: `https://localhost:7000/api/app/authenticate`,
        method: 'POST',
        body: credentials
      }),
    })
  }),
})

export const { useLoginMutation } = loginApi
