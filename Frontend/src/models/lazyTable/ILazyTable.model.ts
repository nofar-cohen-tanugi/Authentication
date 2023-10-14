import { ColumnDef, Row } from "@tanstack/react-table";

export interface ILazyTable<T> {
    data: T[] | undefined;
    columns: ColumnDef<T, string | number | boolean>[]
    classNameTr?: (row: Row<T>) => string | undefined;
    fetchData: () => void;
}