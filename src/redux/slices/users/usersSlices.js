import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";

//initial state

const INITIAL_STATE = {
  loading: false,
  error: null,
  users: [],
  user: null,
  success: false,
  emailMessage: undefined,
  profile: {},
  isEmailSent: false,
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//! Login Action
export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        "http://localhost:9080/api/v1/users/login",
        payload
      );
      //! save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//* Register Action
export const registerAction = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        "http://localhost:9080/api/v1/users/register",
        payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//?Get user public profile action
export const userPublicProfileAction = createAsyncThunk(
  "users/user-public-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:9080/api/v1/users/public-profile/${userId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Get user private  Profile action
export const userPrivateProfileAction = createAsyncThunk(
  "users/user-private-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:9080/api/v1/users/profile/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

////

//! Block user Action
export const blockUserAction = createAsyncThunk(
  "users/block-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/users/block/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);

//? UnBlock user Action
export const unBlockUserAction = createAsyncThunk(
  "users/unblock-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:9080/api/v1/users/unblock/${userId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);

//? Logout Action
export const logoutAction = createAsyncThunk("users/logout", async () => {
  //! remove token from local storage
  localStorage.removeItem("userInfo");
  return true;
});

////
//!forgot password Action
export const forgotPasswordAction = createAsyncThunk(
  "users/forgot-password",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        "http://localhost:9080/api/v1/users/forgot-password",
        payload
      );
      //!save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

////
//? reset password Action
export const resetPasswordAction = createAsyncThunk(
  "users/password-reset",
  async ({ resetToken, password }, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        `http://localhost:9080/api/v1/users/reset-password/${resetToken}`,
        { password }
      );
      //! save the user into localstorage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//? Users slices
const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //* Login
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    //! handle fulfilled state
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    //* Handle the rejection
    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //Register
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
    });
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
    });

    //////////////

    //!forgot password (pending)
    builder.addCase(forgotPasswordAction.pending, (state, action) => {
      state.loading = true;
    });

    //!forgot password (fulfilled)
    builder.addCase(forgotPasswordAction.fulfilled, (state, action) => {
      state.isEmailSent = true;
      state.emailMessage = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //!forgot password (rejected)
    builder.addCase(forgotPasswordAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //////////////

    //!reset password (pending)
    builder.addCase(resetPasswordAction.pending, (state, action) => {
      state.loading = true;
    });

    //!reset password (fulfilled)
    builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //!reset password (rejected)
    builder.addCase(resetPasswordAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    ///

    //get user public profile (pending)
    builder.addCase(userPublicProfileAction.pending, (state, action) => {
      state.loading = true;
    });

    //(fulfilled)
    builder.addCase(userPublicProfileAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //(Rejected)
    builder.addCase(userPublicProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //////


    //get user private profile (pending)
    builder.addCase(userPrivateProfileAction.pending, (state, action) => {
      state.loading = true;
    });

    //(fulfilled)
    builder.addCase(userPrivateProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //(Rejected)
    builder.addCase(userPrivateProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    /////

    //! Block user (Pending)
    builder.addCase(blockUserAction.pending, (state, action) => {
      state.loading = true;
    });

    //!(fulfilled)
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //! (Rejected)
    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //

    ////
    //? UnBlock user Slice (pending)
    builder.addCase(unBlockUserAction.pending, (state, action) => {
      state.loading = true;
    });

    //?(fulfilled)
    builder.addCase(unBlockUserAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //?(rejected)
    builder.addCase(unBlockUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    ////
    //! Reset error action (For annoying popup)
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });

    //! Reset success action (For annoying popup)
    builder.addCase(resetSuccessAction.fulfilled, (state) => {
      state.success = false;
    });
  },
});

//! generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
