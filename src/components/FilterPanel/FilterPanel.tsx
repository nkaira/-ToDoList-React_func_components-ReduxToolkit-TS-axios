import React from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames";

import useTypedSelector from 'store/useTypedSelector';
import { IStatus } from "store/slices/filterSlice";
import { FILTER_ALL, FILTER_COMPLETE, FILTER_ACTIVE } from "store/slices/filterSlice";
import styles from "./filterPanel.module.scss";

export interface IFilterPanel {
    onChange: (filterStatus: IStatus) => void
}

const FilterPanel: React.FC<IFilterPanel> = ({ onChange }) => {

    const [_searchParams, setSearchParams] = useSearchParams();

    const status = useTypedSelector(state => state.filterReducer.status);

    const handleClick = (filterStatus: IStatus) => {
        if (filterStatus === status) {
            return;
        }
        setSearchParams({ status: filterStatus, page: '1' });
        onChange(filterStatus);
    };

    const buttonActive = cn(styles.filter__button, { [styles.activeButton]: status === FILTER_ACTIVE });
    const buttonComplete = cn(styles.filter__button, { [styles.activeButton]: status === FILTER_COMPLETE });
    const buttonAll = cn(styles.filter__button, { [styles.activeButton]: status === FILTER_ALL });

    return (
        <section className={styles.filter}>
            <button className={buttonActive} onClick={() => handleClick(FILTER_ACTIVE)}> Active </button>
            <button className={buttonComplete} onClick={() => handleClick(FILTER_COMPLETE)}> Complete </button>
            <button className={buttonAll} onClick={() => handleClick(FILTER_ALL)}> All </button>
        </section>
    );
};

FilterPanel.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default FilterPanel;