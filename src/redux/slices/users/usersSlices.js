import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { resetErrorAction, resetSuccessAction } from '../globalSlice/globalSlice'

//initial state

const INITIAL_STATE = {
    loading: false,
    error: null,
    users: [],
    user: null,
    success: false,
    profile: {},
    userAuth: {
        error: null,
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
}


//! Login Action
export const loginAction = createAsyncThunk('users/login', async (payload,
    { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
        const { data } = await axios.post(
            "http://localhost:9080/api/v1/users/login", payload
        )
        //! save the user into localstorage
        localStorage.setItem('userInfo', JSON.stringify(data))
        return data
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
})



//* Register Action
export const registerAction = createAsyncThunk('users/register', async (payload,
    { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
        const { data } = await axios.post(
            "http://localhost:9080/api/v1/users/register", payload
        )
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
}
)


//? Logout Action
export const logoutAction = createAsyncThunk('users/logout', async () => {
    //! remove token from local storage
    localStorage.removeItem('userInfo');
    return true
})



//? Users slices
const usersSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {

        //* Login
        builder.addCase(loginAction.pending, (state, action) => {
            state.loading = true
        })
        //! handle fulfilled state
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.userAuth.userInfo = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null
        })
        //* Handle the rejection
        builder.addCase(loginAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })

        //Register
        builder.addCase(registerAction.pending, (state, action) => {
            state.loading = true;
        })
        //handle fulfilled state
        builder.addCase(registerAction.fulfilled, (state, action) => {
            state.user = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });

        //* Handle the rejection
        builder.addCase(registerAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })

        //! Reset error action (For annoying popup)
        builder.addCase(resetErrorAction.fulfilled, (state) => {
            state.error = null
        })

           //! Reset success action (For annoying popup)
           builder.addCase(resetSuccessAction.fulfilled, (state) => {
            state.success = false
        })
    }
})

//! generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer