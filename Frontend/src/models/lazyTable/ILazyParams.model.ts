export interface ILazyParams {
    page: number;
    size: number;
    sortBy?: string;
    isAscending?: boolean;
    filters?: Record<string, string>;
}