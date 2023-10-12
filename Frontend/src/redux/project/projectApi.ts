// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ProjectDto } from '../../models/project/projectDto.model'
import { RootState } from '../store';
import { BaseResponseDto } from '../../models/response/BaseResponseDto.model';
//import { createSlice } from '@reduxjs/toolkit';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers;
    },
  }),
  tagTypes: ['Project'],
  endpoints: (build) => ({
    // The query accepts a number and returns a Post
    getProjects: build.query<BaseResponseDto<ProjectDto[]>, void>({
      query: () => ({
        url: `https://localhost:7000/api/info`,
        method: 'GET',
      })
    }),
  }),
})

export const { useGetProjectsQuery } = projectApi

// const projectReducer = createSlice({
//   name: 'project',
//   initialState: {},
//   reducers: {
//   },
// })

// export default projectReducer.reducer
