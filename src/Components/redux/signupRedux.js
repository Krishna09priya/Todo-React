import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const resetMsg = createAction('resetMsg');

export const postSignup = createAsyncThunk('signup/postSignup', async (data, { rejectWithValue }) => {
    const body = { ...data };
    try {
        const response = await apiGateway.post(serviceEndpoints.signup, body);
        const { success, message } = response?.data;
        if (success) {
            return response?.data; 
        }
        if (response?.status !== 400) {
        Notification(message,'error')
        return rejectWithValue(message)}
    } catch (error) {
        return rejectWithValue(error.message || 'An error occurred');
    }
});

const slice = createSlice({
    name: 'signup',
    initialState: {
        errorMessage: '',
        successMessage: '',
        signupSuccessMessage: '',
        signupErrorMessage: '',
        isLoading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(postSignup.pending, (state) => {
                state.isLoading = true;
                state.signupErrorMessage = '';
                state.signupSuccessMessage = '';
            })
            .addCase(postSignup.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.signupErrorMessage = payload?.message;
                state.signupSuccessMessage = '';
            })
            .addCase(postSignup.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.signupErrorMessage = '';
                state.signupSuccessMessage = payload?.message;
            })
            .addCase(resetMsg, (state) => {
                state.signupErrorMessage = '';
                state.signupSuccessMessage = '';
            });
    },
});

export default slice.reducer;
