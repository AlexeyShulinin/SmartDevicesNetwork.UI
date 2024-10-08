import React from 'react';
import { usePagination } from '../../hooks/usePagination.ts';
import { Button } from '@fluentui/react-components';
import { ChevronLeftFilled, ChevronRightFilled } from '@fluentui/react-icons';
import './styles.css';

interface IPaginationProps {
    page: number;
    total: number;
    pageSize: number;
    onClick: (page: number) => void;
    maxVisiblePages?: number;
}

export const Pagination: React.FC<IPaginationProps> = ({
    page,
    total,
    pageSize,
    onClick,
    maxVisiblePages = 5,
}) => {
    const { pageNumbers, startIndex } = usePagination({
        total,
        pageSize,
        page,
        maxVisiblePages,
    });

    if (total <= maxVisiblePages) {
        return null;
    }

    console.log(page);

    return (
        <div className="pagination">
            <div className="flex-container-centered">
                <Button
                    size="small"
                    icon={<ChevronLeftFilled />}
                    onClick={() => onClick(page - 1)}
                    disabled={page === 0}
                />
                <>
                    {startIndex * maxVisiblePages > pageNumbers?.length && (
                        <>
                            <Button
                                size="small"
                                onClick={() => onClick(0)}
                                className="page-button">
                                1
                            </Button>
                            <span>...</span>
                        </>
                    )}
                    {pageNumbers
                        ?.slice(
                            startIndex * maxVisiblePages,
                            startIndex * maxVisiblePages + maxVisiblePages + 1,
                        )
                        ?.map((pageNumber, index) => {
                            return (
                                <div key={index}>
                                    <Button
                                        size="small"
                                        onClick={() => onClick(pageNumber)}
                                        className="page-button"
                                        disabled={pageNumber === page}>
                                        {pageNumber + 1}
                                    </Button>
                                </div>
                            );
                        })}
                    {page + maxVisiblePages < pageNumbers?.length && (
                        <>
                            <span>...</span>
                            <Button
                                size="small"
                                onClick={() => onClick(pageNumbers.length)}
                                className="page-button">
                                {pageNumbers?.length}
                            </Button>
                        </>
                    )}
                </>
                <Button
                    size="small"
                    icon={<ChevronRightFilled />}
                    onClick={() => onClick(page + 1)}
                    disabled={page + 1 === pageNumbers?.length}
                />
            </div>
        </div>
    );
};
