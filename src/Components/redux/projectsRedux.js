import { createSlice, createAsyncThunk,createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';

export const resetMsg = createAction('resetMsg');

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await apiGateway.get('/projects');
  return response.data;
});

export const createProject = createAsyncThunk('projects/createProject', async (data) => {
  const response = await apiGateway.post('/projects', data);
  return response.data;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    isLoading: false,
    projectsSuccessMessage:''
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projectsSuccessMessage = action?.payload?.message;
      })
      .addCase(resetMsg, (state) => {
        state.projectsSuccessMessage = '';
    });
      
  },
});

export default projectsSlice.reducer;
