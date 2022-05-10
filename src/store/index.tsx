import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "store/slices/taskSlice";
import filterReducer from "store/slices/filterSlice";

export const rootReducer = combineReducers({
    taskReducer, filterReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type StoreType = ReturnType<typeof setupStore>
export type DispatchType = StoreType['dispatch'];

