import React from "react";
import { useSearchParams } from "react-router-dom";

import useTypedSelector from "store/useTypedSelector";
import PaginationButton from "./PaginationButton";
import { IPagination } from "Interface/IPagination";

const Pagination: React.FC<IPagination> = ({ onClick, filteredTasks }) => {

    const [_searchParams, setSearchParams] = useSearchParams();
    const { status, pageSize } = useTypedSelector(state => state.filterReducer);
    const pageNumbers: Array<number> = [];
    const page = Math.ceil(filteredTasks.length / pageSize);

    for (let i = 1; i < page + 1; i++) {
        pageNumbers.push(i);
    };

    const handleClick = (currentPage: number) => {
        const page = currentPage.toString();
        setSearchParams({ status, page });
        onClick(currentPage);
    };

    return (
        <>
            {filteredTasks.length > pageSize &&
                <PaginationButton
                    onClick={handleClick}
                    pageNumbers={pageNumbers}
                />
            }
        </>
    );
};

export default Pagination;