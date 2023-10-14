import { Row, createColumnHelper } from '@tanstack/react-table';
import { ProjectDto } from '../../models/project/projectDto.model';
import { useMemo } from 'react';
import _ from 'lodash';
import { classNames } from 'primereact/utils';
import { useSelector } from 'react-redux';
import { selectLazyParams } from '../../redux/lazyParams/lazyParamsSlice';
import { useLazyGetProjectsQuery } from '../../redux/project/projectApi';
import { Summary } from './summary';
import { LazyTable } from '../Common/LazyTable/lazyTable';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffectOnce } from 'usehooks-ts';
import { Card } from 'primereact/card';

export const Projects = () => {
  const columnHelper = createColumnHelper<ProjectDto>();

  const lazyParams = useSelector(selectLazyParams);

  const [trigger, result] = useLazyGetProjectsQuery();

  const LOW_SCORE = 70;
  const HIGH_SCORE = 90;

  const refetch = () => {
    trigger(lazyParams).unwrap();
  };

  useEffectOnce(() => {
    refetch();
  });

  const columns = useMemo(
    () =>
      Object.keys(result.data?.data[0] ?? []).map((key) => {
        return columnHelper.accessor(key as keyof ProjectDto, {
          header: (info) => _.capitalize(info.header.id),
          cell: (info) =>
            typeof info.getValue() === 'boolean' ? (
              <p>{info.getValue() ? 'V' : 'X'}</p>
            ) : (
              info.getValue()
            ),
        });
      }),
    [columnHelper, result.data?.data]
  );

  const projectsData = useMemo(
    () => result?.data?.data ?? [],
    [result?.data?.data]
  );

  const classNameTr = (row: Row<ProjectDto>) => {
    return classNames({
      'bg-red-100': row.original.score < LOW_SCORE,
      'bg-green-100': row.original.score > HIGH_SCORE,
    });
  };

  return result.isLoading ? (
    <div className='flex justify-content-center align-items-center w-full h-full'>
      <ProgressSpinner />
    </div>
  ) : (
    <>
      <Card title={'My Projects'} className='mx-3 project-card'>
        <Summary projects={projectsData} />
        <LazyTable<ProjectDto>
          columns={columns}
          data={projectsData}
          classNameTr={classNameTr}
          fetchData={refetch}
        />
      </Card>
    </>
  );
};
