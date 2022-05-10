import React from "react";
import cn from "classnames";

import useTypedSelector from "store/useTypedSelector";
import styles from "./pagination.module.scss";
import { IPaginationButton } from "Interface/IPagination";

const PaginationButton: React.FC<IPaginationButton> = ({ onClick, pageNumbers }) => {

    const { currentPage } = useTypedSelector(state => state.filterReducer);

    return (
        <nav className={styles.container}>
            {pageNumbers.map(number => (
                <button key={number} className={cn(styles.button, { [styles.activeButton]: Number(currentPage) === number })} onClick={() => onClick(number)}>
                    {number}
                </button>
            ))
            }
        </nav>
    );
};

export default PaginationButton;