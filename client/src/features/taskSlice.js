import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import taskService from '../api/taskService';

const initialState = {
  value: [],
  filterStatus: 'all'
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.filterStatus = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(storeTask.fulfilled, (state, action) => {
        state.value.push(action.payload);
        state.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.value = state.value.map(task => {
          return task._id === action.payload._id ? action.payload : task;
        });
      })
      .addCase(destroyTask.fulfilled, (state, action) => {
        state.value = state.value.filter(task => task._id !== action.payload._id);
      });
  }
});

const fetchTasks = createAsyncThunk('task/index', async (_, { rejectWithValue }) => {
  try {
    const fetchedTasks = await taskService.index();
    return fetchedTasks;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const storeTask = createAsyncThunk('task/store', async ({ title, status }, { rejectWithValue }) => {
  try {
    const storedTask = await taskService.store({ title, status });
    return storedTask;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const updateTask = createAsyncThunk(
  'task/update',
  async ({ id, title, status }, { rejectWithValue }) => {
    try {
      const updatedTask = await taskService.update({ id, title, status });
      return updatedTask;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const destroyTask = createAsyncThunk('task/destroy', async (taskId, { rejectWithValue }) => {
  try {
    const deletedTask = await taskService.destroy(taskId);
    return deletedTask;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export { fetchTasks, storeTask, updateTask, destroyTask };
export const { updateStatus } = taskSlice.actions;
export default taskSlice.reducer;
