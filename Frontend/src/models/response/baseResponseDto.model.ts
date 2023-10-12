export interface BaseResponseDto<T> {
    isSuccess: boolean
    totalCount: number;
    data: T
}