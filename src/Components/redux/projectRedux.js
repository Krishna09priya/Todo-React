import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';

export const resetMsg = createAction('resetMsg');

export const fetchProject = createAsyncThunk('project/fetchProject', async ({id}) => {
  const response = await apiGateway.get(`/projects/${id}`);
  return response.data;
});

export const updateProjectTitle = createAsyncThunk('project/updateProjectTitle', async ({ id, title }) => {
  const response = await apiGateway.put(`/projects/${id}`, { title });
  return response.data;
});

export const addTodo = createAsyncThunk('project/addTodo', async ({ id, description }) => {
  const response = await apiGateway.post(`/projects/${id}/todos`, { description });
  return response.data;
});

export const updateTodo = createAsyncThunk('project/updateTodo', async ({ projectId, todoId, description }) => {
  const response = await apiGateway.put(`/projects/${projectId}/todos/${todoId}`, { description });
  return response.data;
});

export const StatusTodo = createAsyncThunk('project/StatusTodo', async ({ projectId, todoId, status }) => {
  const response = await apiGateway.put(`/projects/${projectId}/todostatus/${todoId}`, { status });
  return response.data;
});

export const deleteTodo = createAsyncThunk('project/deleteTodo', async ({ projectId, todoId }) => {
  const response = await apiGateway.delete(`/projects/${projectId}/todos/${todoId}`);
  return response.data;
});

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    project: null,
    isLoading: false,
    projectUpdateSuccessMessage:'',
    todoSuccessMessage:'',
    todoUpdateSuccessMessage:'',
    todoDeleteSuccessMessage:'',
    todoStatusSuccessMessage:'',
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project = action.payload;
      })
      .addCase(updateProjectTitle.fulfilled, (state, {payload}) => {
        state.projectUpdateSuccessMessage = payload?.message;
      })
      .addCase(addTodo.fulfilled, (state, {payload}) => {
        state.todoSuccessMessage = payload?.message
      })
      .addCase(StatusTodo.fulfilled, (state,{payload}) => {
        state.todoStatusSuccessMessage = payload?.message;
      })
      .addCase(updateTodo.fulfilled, (state,{payload}) => {
        state.todoUpdateSuccessMessage = payload?.message;
      })
      .addCase(deleteTodo.fulfilled, (state, {payload}) => {
        console.log('ttt',payload?.message)
        state.todoDeleteSuccessMessage = payload?.message;
      })
      .addCase(resetMsg, (state) => {
        state.todoSuccessMessage = '';
        state.todoUpdateSuccessMessage='';
        state.todoDeleteSuccessMessage='';
        state.projectUpdateSuccessMessage='';
        state.todoStatusSuccessMessage ='';
    });
  },
});

export default projectSlice.reducer;
