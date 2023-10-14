import { ILazyParams } from "../models/lazyTable/ILazyParams.model";

export function convertLazyParamsToQueryString<T>(params: ILazyParams<T>) {
    const queryParams = [];

    // Add standard parameters
    queryParams.push(`page=${params.page}`);
    queryParams.push(`size=${params.size}`);
    if (params.sortBy)
        queryParams.push(`orderBy=${params.sortBy}`);
    if (params.isAscending === false)
        queryParams.push(`isAscending=${params.isAscending}`);

    if (params.filters) {
        // Add filter parameters
        for (const key in params.filters) {
            const value = params.filters[key];
            queryParams.push(`filter${key}=${encodeURIComponent(value)}`);
        }
    }

    // Combine all parameters into a single query string
    const queryString = queryParams.join('&');

    return `?${queryString}`;
}