import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from "../globalSlice/globalSlice";

//initialstate
const INITIAL_STATE = {
    loading: false,
    error: null,
    posts: [],
    post: null,
    success: false,
}

//!Fetch public posts Action
export const fetchPublicPostsAction = createAsyncThunk("posts/fetch-public-posts",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        //make request
        try {
            const { data } = await axios.get(
                "http://localhost:9080/api/v1/posts/public",
            )
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    })

//////
//!Fetch Single posts Action
export const getSinglePostAction = createAsyncThunk(
    "posts/get-singlePost",
        async (postId,  {rejectWithValue, getState, dispatch}) => {
        //make request
        try{
            const {data} = await axios.get(
                `http://localhost:9080/api/v1/posts/${postId}`
            )
            return data;
        }catch(error){
            rejectWithValue(error?.response?.data)
        }
    })




//? Create Post Action
export const addPostAction = createAsyncThunk("post/create",
    async (payload, { rejectWithValue, getState, dispatch }) => {

        //make request
        try {
            //! convert the payload to formdata
            const formData = new FormData();
            formData.append('title', payload?.title)
            formData.append('content', payload?.content)
            formData.append('categoryId', payload?.category)  //(In backend we are passing it as an categoryId in (postman form-data)  in client side we are passing it as category )
            formData.append('file', payload?.image)    //(In backend we are passing it as an file in (postman form-data)  in client side we are passing it as image )
            //get the token coz it is behind authentication
            const token = getState().users?.userAuth?.userInfo?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            const { data } = await axios.post(
                "http://localhost:9080/api/v1/posts", formData, config
            )
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    })


//public post slice
const publicPostSlice = createSlice({
    name: "posts",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        //fetch public posts (pending)
        builder.addCase(fetchPublicPostsAction.pending, (state, action) => {
            state.loading = true
        })

        //handle fulfilled state
        builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.success = true;
            state.loading = false;
            state.error = null;
        });

        //! Handle the rejection
        builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false
        });

        // //////////////////////////

        //?create post (pending state)
        builder.addCase(addPostAction.pending, (state, action) => {
            state.loading = true;
        })
        //?create post (fullfilled state)
        builder.addCase(addPostAction.fulfilled, (state, action) => {
            state.post = action.payload;
            state.success = true;
            state.error = null;
            state.loading = false
        })

        //?create post (rejection state)
        builder.addCase(addPostAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })


///////
//! get single post (pending state)
builder.addCase(getSinglePostAction.pending, (state, action) => {
    state.loading = true;
});

//! get single post (fulfilled state)
builder.addCase(getSinglePostAction.fulfilled, (state, action) => {
state.post = action.payload;
state.loading = false
// state.success = true
state.error = null;
});

//! get single post (rejected state)
builder.addCase(getSinglePostAction.rejected, (state, action) => {
state.error = action.payload;
state.loading = false
})


        ////////////////

        //! Reset error action
        builder.addCase(resetErrorAction.fulfilled, (state) => {
            state.error = null
        });

        //? Reset success action
        builder.addCase(resetSuccessAction.fulfilled, (state) => {
            state.success = false
        });
    },
});



//!generate reducer
const postsReducer = publicPostSlice.reducer;

export default postsReducer