import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITask } from "Interface/ITask";
import Storage from "utils/storage";
import { getTasks, postTasks } from "store/actionAsyncCreators";

interface ImockAPIio {
    id: string
    tasks: Array<ITask>
}

interface InitialStateType {
    tasks: Array<ITask>
    isLoading: boolean
    getError: string
    postError: string
    postSuccess: boolean
}

const initialState: InitialStateType = {
    tasks: [],
    isLoading: false,
    getError: '',
    postError: '',
    postSuccess: false
};

let tasks: Array<ITask> = [];

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<string>) {
            const newTask = {
                taskId: Date.now(),
                title: action.payload,
                complete: false,
            }
            tasks = state.tasks.concat(newTask);
            Storage.setItem('tasks', tasks);
            state.getError = '';
            state.tasks = tasks;
        },
        setTask(state, action) {
            tasks = action.payload;
            Storage.setItem('tasks', tasks);
            state.tasks = tasks;
        },
        removeTask(state, action) {
            tasks = [...state.tasks].filter(task => task.taskId !== action.payload);
            Storage.setItem('tasks', tasks);
            state.tasks = tasks;
        },
        completeTask(state, action) {
            tasks = [...state.tasks].map(task => {
                if (task.taskId === action.payload) {
                    return { ...task, complete: !task.complete };
                }
                return { ...task };
            })
            Storage.setItem('tasks', tasks);
            state.tasks = tasks;

        },
        completeAllTasks(state) {
            const completeTasks = [...state.tasks].filter(task => task.complete === true);
            tasks = [...state.tasks].map(task => {
                if (completeTasks.length === state.tasks.length) {
                    task.complete = !task.complete;
                } else {
                    task.complete = true;
                }
                return task;
            })
            Storage.setItem('tasks', tasks);
            state.tasks = tasks;
        },
        deleteAllTasks(state) {
            Storage.setItem('tasks', []);
            state.tasks = initialState.tasks;
        },
        setPostError(state) {
            state.postError = '';
            state.postSuccess = false;
        }
    },
    extraReducers: {
        [getTasks.fulfilled.type]: (state, action: PayloadAction<ITask[]>) => {
            state.isLoading = false;
            state.getError = '';
            state.tasks = action.payload;
        },
        [getTasks.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getTasks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.getError = action.payload;
        },
        [postTasks.fulfilled.type]: (state, action: PayloadAction<ImockAPIio>) => {
            state.postError = '';
            state.postSuccess = true;
        },
        [postTasks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.postError = action.payload;
        }
    }
});

export const { addTask, setTask, removeTask, setPostError,
    completeTask, completeAllTasks, deleteAllTasks } = taskSlice.actions;

export default taskSlice.reducer;