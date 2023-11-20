import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlice";
import BASE_URL from "../../../utils/baseURL";

//initialstate
const INITIAL_STATE = {
  loading: false,
  error: null,
  posts: [],
  post: null,
  success: false,
};

//!Fetch public posts Action
export const fetchPublicPostsAction = createAsyncThunk(
  "posts/fetch-public-posts",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/posts/public`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

////
//!Fetch private posts Action
export const fetchPrivatePostsAction = createAsyncThunk(
  "posts/fetch-private-posts",
  async (
    { page = 1, limit = 2, searchTerm = "", category = "" },
    { rejectWithValue, getState, dispatch }
  ) => {
    //if ther is no pagination there will be payload instead of page and limit
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${BASE_URL}/posts?page=${page}&limit=${limit}&searchTerm=${searchTerm}&category=${category}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//////
//!Fetch Single posts Action
export const getSinglePostAction = createAsyncThunk(
  "posts/get-singlePost",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(`${BASE_URL}/posts/${postId}`);
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);

/////
//! delete post Action
export const deletePostAction = createAsyncThunk(
  "posts/delete-post",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `${BASE_URL}/posts/${postId}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//////////
//! like post

export const likePostAction = createAsyncThunk(
  "posts/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/posts/likes/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//////////
//! dislike post

export const dislikePostAction = createAsyncThunk(
  "posts/dislike",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        ` ${BASE_URL}/posts/dislike/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//////////
//!  post view count

export const postViewsCountAction = createAsyncThunk(
  "posts/post-views",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        ` ${BASE_URL}/posts/${postId}/post-view-count`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

///////

//////////
//! clap post

export const clapPostAction = createAsyncThunk(
  "posts/clap",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        ` ${BASE_URL}/posts/claps/${postId}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

///////
//? Create Post Action
export const addPostAction = createAsyncThunk(
  "post/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      //! convert the payload to formdata
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category); //(In backend we are passing it as an categoryId in (postman form-data)  in client side we are passing it as category )
      formData.append("file", payload?.image); //(In backend we are passing it as an file in (postman form-data)  in client side we are passing it as image )
      //get the token coz it is behind authentication
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${BASE_URL}/posts`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

////

////
//* update post
export const updatePostAction = createAsyncThunk(
  "post/update",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      //! convert the payload to formdata
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category); //(In backend we are passing it as an categoryId in (postman form-data)  in client side we are passing it as category )
      formData.append("file", payload?.image); //(In backend we are passing it as an file in (postman form-data)  in client side we are passing it as image )
      //get the token coz it is behind authentication
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/posts/${payload?.postId}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

////

//! Schedule a post
export const schedulePostAction = createAsyncThunk(
  "posts/schedule-post",
  async (
    { postId, scheduledPublish },
    { rejectWithValue, getState, dispatch }
  ) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/posts/schedule/${postId}`,
        {
          scheduledPublish,
        },
        config
      );
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//////////////////   Slice    ?///////////////////////////////
////
//public post slice
const postSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetch public posts (pending)
    builder.addCase(fetchPublicPostsAction.pending, (state, action) => {
      state.loading = true;
    });

    //handle fulfilled state
    builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });

    //! Handle the rejection
    builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    /////
    //!fetch private posts (pending)
    builder.addCase(fetchPrivatePostsAction.pending, (state, action) => {
      state.loading = true;
    });

    //handle fulfilled state
    builder.addCase(fetchPrivatePostsAction.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    });

    //! Handle the rejection
    builder.addCase(fetchPrivatePostsAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // //////////////////////////

    //?create post (pending state)
    builder.addCase(addPostAction.pending, (state, action) => {
      state.loading = true;
    });
    //?create post (fullfilled state)
    builder.addCase(addPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.success = true;
      state.error = null;
      state.loading = false;
    });

    //?create post (rejection state)
    builder.addCase(addPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    ////

    //?update post (pending state)
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    //?update post (fullfilled state)
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.success = true;
      state.error = null;
      state.loading = false;
    });

    //?update post (rejection state)
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    ///////
    //! get single post (pending state)
    builder.addCase(getSinglePostAction.pending, (state, action) => {
      state.loading = true;
    });

    //! get single post (fulfilled state)
    builder.addCase(getSinglePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });

    //! get single post (rejected state)
    builder.addCase(getSinglePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //////

    //! like post (pending state)
    builder.addCase(likePostAction.pending, (state, action) => {
      state.loading = true;
    });

    //! like post (fulfilled state)
    builder.addCase(likePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });

    //! like post (rejected state)
    builder.addCase(likePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    ///////
    //! dislike post (pending state)
    builder.addCase(dislikePostAction.pending, (state, action) => {
      state.loading = true;
    });

    //! dislike post (fulfilled state)
    builder.addCase(dislikePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });

    //! dislike post (rejected state)
    builder.addCase(dislikePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //////

    ///////
    //!  post view(pending state)
    builder.addCase(postViewsCountAction.pending, (state, action) => {
      state.loading = true;
    });

    //!  post view (fulfilled state)
    builder.addCase(postViewsCountAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });

    //!  post view (rejected state)
    builder.addCase(postViewsCountAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    ///////

    ///////
    //! clap post (pending state)
    builder.addCase(clapPostAction.pending, (state, action) => {
      state.loading = true;
    });

    //! clap post (fulfilled state)
    builder.addCase(clapPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });

    //! clap post (rejected state)
    builder.addCase(clapPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    ///////
    //! delete post (pending state)
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });

    //!  delete post (fulfilled state)
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //!  delete post (rejected state)
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    ////////////////

    //! Schedule post (pending state)
    builder.addCase(schedulePostAction.pending, (state, action) => {
      state.loading = true;
    });

    //!  (fulfilled state)
    builder.addCase(schedulePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });

    //!   (rejected state)
    builder.addCase(schedulePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! Reset error action
    builder.addCase(resetErrorAction.fulfilled, (state) => {
      state.error = null;
    });

    //? Reset success action
    builder.addCase(resetSuccessAction.fulfilled, (state) => {
      state.success = false;
    });
  },
});

//!generate reducer
const postsReducer = postSlice.reducer;

export default postsReducer;
