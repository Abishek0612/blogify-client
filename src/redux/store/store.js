import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../slices/users/usersSlices'
import postsReducer from '../slices/posts/postSlice'
import categoriesReducer from '../slices/categories/categoriesSlice'

//! Store
const store = configureStore({
    reducer: {
        users: usersReducer,
        posts: postsReducer,
        categories: categoriesReducer,
    }
})

export default store