import { Row, createColumnHelper } from '@tanstack/react-table';
import { ProjectDto } from '../../models/project/projectDto.model';
import { useMemo } from 'react';
import _ from 'lodash';
import { classNames } from 'primereact/utils';
import { ProgressSpinner } from 'primereact/progressspinner';
import { LazyTable } from '../Common/LazyTable/lazyTable';
import { Summary } from './summary';

export const Projects = (props: {
  projects: ProjectDto[] | undefined;
  isFetching: boolean;
  isLoading: boolean;
}) => {
  const columnHelper = createColumnHelper<ProjectDto>();

  const LOW_SCORE = 70;
  const HIGH_SCORE = 90;

  const columns = useMemo(
    () =>
      Object.keys(props.projects?.[0] ?? []).map((key) => {
        return columnHelper.accessor(key as keyof ProjectDto, {
          header: (info) => _.capitalize(info.header.id),
          cell: (info) => info.getValue(),
        });
      }),
    [columnHelper, props.projects]
  );

  const data = useMemo(() => props.projects ?? [], [props.projects]);

  const classNameTr = (row: Row<ProjectDto>) => {
    return classNames({
      'bg-red-100': row.original.score < LOW_SCORE,
      'bg-green-100': row.original.score > HIGH_SCORE,
    });
  };

  return props.isLoading ? (
    <div className='flex justify-content-center align-items-center w-full h-full'>
      <ProgressSpinner />
    </div>
  ) : (
    <>
      <Summary projects={data} />
      <LazyTable<ProjectDto>
        columns={columns}
        data={data}
        classNameTr={classNameTr}
      />
    </>
  );
};
