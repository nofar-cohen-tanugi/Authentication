import {
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ILazyTable } from '../../../models/lazyTable/ILazyTable.model';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLazyParams,
  setLazyParams,
} from '../../../redux/lazyParams/lazyParamsSlice';

export function LazyTable<T>(props: ILazyTable<T>) {
  const { data, columns, classNameTr, fetchData } = props;

  const [sorting, setSorting] = useState<SortingState>([]);
  const dispatch = useDispatch();

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  const lazyParams = useSelector(selectLazyParams);

  useEffect(() => {
    if (sorting.length && sorting[0]?.id) {
      dispatch(
        setLazyParams({
          sortBy: sorting[0]?.id,
          isAscending: !sorting[0]?.desc,
        })
      );
    }
  }, [dispatch, sorting]);

  useEffect(() => {
    if (lazyParams) {
      fetchData();
    }
  }, [fetchData, lazyParams]);

  return (
    <div className='table-container'>
      {data && (
        <table className='lazy-table'>
          <thead className='sticky top-0 bg-white'>
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
          <tbody style={{ height: '10rem' }}>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={classNameTr && classNameTr(row as Row<T>)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
