import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const FILTER_COMPLETE = 'FILTER_COMPLETE';
export const FILTER_ACTIVE = 'FILTER_ACTIVE';
export const FILTER_ALL = 'FILTER_ALL';

export type IStatus = typeof FILTER_ALL | typeof FILTER_COMPLETE | typeof FILTER_ACTIVE

interface InitialStateType {
    status: IStatus,
    currentPage: number,
    pageSize: number,
}

const initialState: InitialStateType = {
    status: FILTER_ALL,
    currentPage: 1,
    pageSize: 3,
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilterStatus(state, action: PayloadAction<IStatus>) {
            state.status = action.payload;
        },
        setPageStatus(state) {
            state.status = FILTER_ALL;
            state.currentPage = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        }
    }
});

export const { setFilterStatus, setPageStatus, setPage } = filterSlice.actions;

export default filterSlice.reducer;