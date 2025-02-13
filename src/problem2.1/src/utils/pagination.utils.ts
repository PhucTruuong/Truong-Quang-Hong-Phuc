export class PaginationResponse<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    };

    constructor(data: T[], totalItems: number, page: number, limit: number) {
        this.data = data;
        this.meta = {
            page,
            limit,
            itemCount: totalItems,
            pageCount: Math.ceil(totalItems / limit),
            hasPreviousPage: page > 1,
            hasNextPage: page * limit < totalItems
        };
    }
}

export const createPaginationResponse = <T>(data: T[], totalItems: number, page: number, limit: number) => {
    return new PaginationResponse<T>(data, totalItems, page, limit);
};
