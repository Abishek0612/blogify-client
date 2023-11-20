import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";
import BASE_URL from "../../../utils/baseURL";

//initial state
const INITIAL_STATE = {
  loading: false,
  error: null,
  comments: [],
  comment: null,
  success: false,
};

//! Create comment Action
export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make reqest
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/comments/${payload?.postId}`,
        {
          message: payload?.message,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);



///////////
//? comment Slice
const postSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //create comment (pending)
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    // (fullfilled)
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      console.log(action.payload)
      state.comment = action.payload;
      state.loading = false;
      state.error = null;
    });

    //!(rejected)
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //!Reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });

    //! Reset success action
    builder.addCase(resetSuccessAction.fulfilled, (state) => {
      state.success = false;
    });
  },
});

//? generate reducer
const commentReducer = postSlice.reducer;
export default commentReducer;
