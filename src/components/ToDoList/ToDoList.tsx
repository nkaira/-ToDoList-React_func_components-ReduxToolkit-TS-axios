import React, { useState } from "react";

import Pagination from "components/Pagination/Pagination";
import FilterPanel from "components/FilterPanel/FilterPanel";
import ControlPanel from "components/ControlPanel/ControlPanel";
import FetchPanel from "components/FetchPanel/FetchPanel";
import TaskList from "components/TaskList/TaskList";
import ModalDeleteTask from "components/Modal/ModalDeleteTask";
import ModalPostTasks from "components/Modal/ModalPostTasks";
import useTypedSelector from "store/useTypedSelector";
import useTypedDispatch from "store/useTypedDispatch";
import { ITask } from "Interface/ITask";
import { FILTER_ALL, FILTER_COMPLETE, FILTER_ACTIVE } from "store/slices/filterSlice";
import {
    addTask, removeTask, setPostError,
    completeTask, completeAllTasks, deleteAllTasks
} from "store/slices/taskSlice";
import { setFilterStatus, setPageStatus, setPage, IStatus } from "store/slices/filterSlice";

export const ToDoList = () => {

    const dispatch = useTypedDispatch();

    const { tasks, isLoading, getError, postError, postSuccess } = useTypedSelector(state => state.taskReducer);
    const { currentPage, status, pageSize } = useTypedSelector(state => state.filterReducer);

    const [inputValue, setInputValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [targetTaskId, setTargetTaskId] = useState<number | null>(null);

    const getFilteredTasks = (tasks: Array<ITask>): Array<ITask> => {

        if (status === FILTER_ALL) {
            return tasks;
        } else if (status === FILTER_ACTIVE) {
            return tasks.filter(task => {
                if (task.complete === false) {
                    return task;
                };
            });
        } else if (status === FILTER_COMPLETE) {
            return tasks.filter(task => {
                if (task.complete === true) {
                    return task;
                };
            });
        };
        return tasks;
    };

    const getPaginatedTasks = (filteredTasks: Array<ITask>): Array<ITask> => {
        const prevPage = currentPage - 1;
        const start = pageSize * prevPage;
        const end = start + pageSize;
        const paginatedItems = filteredTasks.slice(start, end);
        return paginatedItems;
    };

    const filteredTasks = getFilteredTasks(tasks);
    const paginatedTasks = getPaginatedTasks(filteredTasks);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAdd = () => {
        dispatch(addTask(inputValue));
        setInputValue('');
    };

    const handleDeleteAll = () => {
        dispatch(deleteAllTasks());
        dispatch(setPageStatus());
    };

    const handleCompleteAll = () => {
        dispatch(completeAllTasks());
    };

    const setCurrentPage = () => {
        const filteredTasks = getFilteredTasks(tasks);
        const paginatedTasks = getPaginatedTasks(filteredTasks);
        const page = (paginatedTasks.length - 1 === 0) ? currentPage - 1 : currentPage;
        dispatch(setPage(page));
    };

    const handleCompleteTask = (targetId: number) => {
        dispatch(completeTask(targetId));
        if (status === FILTER_ALL) {
            return;
        }
        setCurrentPage();
    };

    const handleModalShow = (targetId: number) => {
        setIsOpen(true);
        setTargetTaskId(targetId);
    };

    const handleModalCancel = () => {
        setIsOpen(false);
        setTargetTaskId(null);
    };

    const handleModalOk = () => {
        dispatch(removeTask(targetTaskId!));
        setCurrentPage();
        setIsOpen(false);
        setTargetTaskId(null);
    };

    const handleModalClose = () => {
        dispatch(setPostError());
    };

    const handlePaginationButton = (page: number) => {
        dispatch(setPage(page));
    };

    const handleChangeFilter = (filterStatus: IStatus) => {
        dispatch(setFilterStatus(filterStatus));
        dispatch(setPage(1));
    };

    return (
        <div>
            <ControlPanel
                onAdd={handleAdd}
                onInput={handleInput}
                onDeleteAll={handleDeleteAll}
                onCompleteAll={handleCompleteAll}
                inputValue={inputValue}
            />
            <>
                {isLoading && <h1>Loading...</h1>}
                {getError && <h1>{getError}</h1>}
                <TaskList
                    onModalShow={handleModalShow}
                    paginatedTasks={paginatedTasks}
                    onComplete={handleCompleteTask}
                />
            </>
            <Pagination
                filteredTasks={filteredTasks}
                onClick={handlePaginationButton}
            />
            <FilterPanel
                onChange={handleChangeFilter}
            />
            {isOpen &&
                <ModalDeleteTask
                    onCancel={handleModalCancel}
                    onOk={handleModalOk}
                />
            }
            {(postError || postSuccess) &&
                <ModalPostTasks
                    onClose={handleModalClose}
                    errorMessage={postError}
                />
            }
            <FetchPanel />
        </div>
    );
};

export default ToDoList;