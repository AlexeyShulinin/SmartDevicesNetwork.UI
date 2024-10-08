import { useEffect, useState } from 'react';

interface IUsePaginationProps {
    total: number;
    pageSize: number;
    page: number;
    maxVisiblePages: number;
}

export const usePagination = ({
    total,
    pageSize,
    page,
    maxVisiblePages,
}: IUsePaginationProps) => {
    const [pageNumbers, setPageNumbers] = useState<number[] | null>(null);
    const [startIndex, setStartIndex] = useState<number>(0);

    useEffect(() => {
        if (total > 0) {
            setPageNumbers(
                Array.from(
                    { length: Math.ceil(total / pageSize) },
                    (_, index) => index,
                ),
            );
        }
    }, [total, pageSize]);

    useEffect(() => {
        if (page % maxVisiblePages === 0) {
            setStartIndex(page / maxVisiblePages);
        }
    }, [page, maxVisiblePages]);

    return {
        pageNumbers,
        startIndex,
    };
};
