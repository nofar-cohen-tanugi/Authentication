import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectDto } from '../../models/project/projectDto.model';
import { BaseResponseDto } from '../../models/response/baseResponseDto.model';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Project'],
  endpoints: (build) => ({
    // The query accepts a number and returns a Post
    getProjects: build.query<BaseResponseDto<ProjectDto[]>, string>({
      query: (token: string) => ({
        url: `https://localhost:7000/api/app/info`,
        method: 'GET',
        header: { authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const { useGetProjectsQuery } = projectApi;
