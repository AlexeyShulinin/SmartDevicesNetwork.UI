export interface IPagedListResponse<T> {
    items: T[];
    currentPage: number;
    total: number;
    nextPage: number | null;
}
