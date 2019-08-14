export interface AbstractDataPaging<E> {
    loading?: boolean;
    data?: {
        nodes: E[];
        totalCount?: number;
        pageInfo?: {
            hasNextPage?: boolean;
            startCursor?: string
            endCursor?: string
        };
    }
}
