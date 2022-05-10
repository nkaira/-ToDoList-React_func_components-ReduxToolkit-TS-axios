import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import ToDoList from "components/ToDoList/ToDoList";
import TaskDetail from "components/TaskDetail/TaskDetail";
import { setTask } from "store/slices/taskSlice";
import { setPage, setFilterStatus, IStatus } from "store/slices/filterSlice";
import Storage from "utils/storage";
import styles from "./app.module.scss";

const App = () => {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {

        const tasks = Storage.getItem('tasks');

        if (tasks?.length > 0) {
            dispatch(setTask(tasks));
        };

        const currentPage: string | null = searchParams.get('page');

        if (currentPage) {
            dispatch(setPage(Number(currentPage)));
        };

        const status = searchParams.get('status') as IStatus;

        if (status) {
            dispatch(setFilterStatus(status));
        };
    }, []);

    return (
        <div className={styles.header}>
            <h1 className={styles.title}>To Do List</h1>
            <Routes>
                <Route path='/' element={<ToDoList />} />
                <Route path='/:taskId' element={<TaskDetail />} />
            </Routes>
        </div>
    );
};

export default App;
