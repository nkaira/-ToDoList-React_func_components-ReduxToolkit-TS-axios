import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { ITask } from "Interface/ITask";

export const getTasks = createAsyncThunk(
    'getTasks',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('https://626b1133e5274e6664c73703.mockapi.io/ToDoList_API/v1/Fetch_ToDoList');
            return response.data;
        } catch (e) {
            console.error('get tasks error', e);
            return thunkAPI.rejectWithValue('Failed to load tasks from server');
        }
    }
);

export const postTasks = createAsyncThunk(
    'postTasks',
    async (tasks: Array<ITask>, thunkAPI) => {
        try {
            const response = await axios.post('https://626b1133e5274e6664c73703.mockapi.io/ToDoList_API/v1/Fetch_ToDoList', { tasks });
            return response.data;
        } catch (e) {
            console.error('post tasks error', e);
            return thunkAPI.rejectWithValue('failed to upload tasks to server');
        }
    }
);

