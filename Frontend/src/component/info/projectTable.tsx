import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ProjectDto } from '../../models/project/projectDto.model';
import { useMemo, useState } from 'react';
import _ from 'lodash';
import { classNames } from 'primereact/utils';

export const ProjectTable = (props: {
  projects: ProjectDto[] | undefined;
  isFetching: boolean;
  isLoading: boolean;
}) => {
  const columnHelper = createColumnHelper<ProjectDto>();

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () =>
      Object.keys(props.projects?.[0] ?? []).map((key) => {
        return columnHelper.accessor(key as keyof ProjectDto, {
          header: (info) => _.capitalize(info.header.id),
          cell: (info) => info.getValue(),
          footer: (info) => info.column.id,
        });
      }),
    [columnHelper, props.projects]
  );
  const data = useMemo(() => props.projects ?? [], [props.projects]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(columns);

  return (
    <>
      {props.projects && (
        <table className='project-table'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={classNames({
                  'bg-red-100': row.original.score < 70,
                  'bg-green-100': row.original.score > 90,
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      )}
    </>
  );
};
