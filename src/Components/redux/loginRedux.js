import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import apiGateway from '../../config/service';
import serviceEndpoints from '../../config/serviceEndpoints';


export const resetMsg = createAction('resetMsg');

export const postLogin = createAsyncThunk('login/postLogin', async (data, { rejectWithValue }) => {
    const body = { ...data };
    try {
        const response = await apiGateway.post(serviceEndpoints.login, body);
        const { success, message } = response?.data;
        if (success) {
            return response?.data; // Assuming this contains user and accessToken
        }
        if (response?.status !== 400) {
            Notification(message,'error')
            return rejectWithValue(message);}
    } catch (error) {
        return rejectWithValue(error.message || 'An error occurred');
    }
});

const slice = createSlice({
    name: 'login',
    initialState: {
        errorMessage: '',
        successMessage: '',
        logInSuccessMessage: '',
        logInErrorMessage: '',
        isLoading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(postLogin.pending, (state) => {
                state.isLoading = true;
                state.logInErrorMessage = '';
                state.logInSuccessMessage = '';
            })
            .addCase(postLogin.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.logInErrorMessage = payload?.message
                state.logInSuccessMessage = '';
            })
            .addCase(postLogin.fulfilled, (state, { payload }) => {
                if (payload?.success && payload?.data?.token) {
                    localStorage.setItem('accessToken',payload?.data?.token);  
                    localStorage.setItem('IsSubscribed',payload?.data?.isSubscribed?.toString());
                }

                state.isLoading = false;
                state.logInErrorMessage = '';
                state.logInSuccessMessage = payload?.message;
            })
            .addCase(resetMsg, (state) => {
                state.logInErrorMessage = '';
                state.logInSuccessMessage = '';
            });
    },
});

export default slice.reducer;
