import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectDto } from '../../models/project/projectDto.model';
import { BaseResponseDto } from '../../models/response/baseResponseDto.model';
import { ILazyParams } from '../../models/lazyTable/ILazyParams.model';
import { convertLazyParamsToQueryString } from '../../utils/lazyParams';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Project'],
  endpoints: (build) => ({
    // The query accepts a number and returns a Post
    getProjects: build.query<BaseResponseDto<ProjectDto[]>, ILazyParams>({
      query: (lazyParams: ILazyParams) => ({
        url: `https://localhost:7000/api/app/info${convertLazyParamsToQueryString(
          lazyParams
        )}`,
        method: 'GET',
        header: { authorization: `Bearer ` },
      }),
    }),
  }),
});

export const { useLazyGetProjectsQuery } = projectApi;
