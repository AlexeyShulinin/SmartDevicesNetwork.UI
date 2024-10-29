import { useEffect, useState } from 'react';

interface IUsePaginationProps {
    total: number;
    pageSize: number;
    page: number;
    maxVisiblePages: number;
}

type UsePaginationReturnType = {
    pageNumbers: number[];
    startIndex: number;
};

export const usePagination = ({
    total,
    pageSize,
    page,
    maxVisiblePages,
}: IUsePaginationProps): UsePaginationReturnType => {
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [startIndex, setStartIndex] = useState<number>(0);

    useEffect(() => {
        if (total <= 0) {
            return;
        }

        setPageNumbers(
            Array.from(
                { length: Math.ceil(total / pageSize) },
                (_, index) => index,
            ),
        );
    }, [total, pageSize]);

    useEffect(() => {
        if (page % maxVisiblePages !== 0) {
            return;
        }

        setStartIndex(page / maxVisiblePages);
    }, [page, maxVisiblePages]);

    return {
        pageNumbers,
        startIndex,
    };
};
