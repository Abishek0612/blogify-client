import React, { useEffect, useState } from "react";
import Select from 'react-select'
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";
import {  updatePostAction } from "../../redux/slices/posts/postSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import SuccessMsg from "../Alert/SuccessMsg";
import ErrorMsg from "../Alert/ErrorMsg";
import { useParams } from "react-router-dom";


const UpdatePost = () => {
//* Get the post id from params
const {postId}= useParams()

  //!fetch categories
  const dispatch = useDispatch()
  //! Error state
  const [errors, setErrors] = useState({})

  //? get data from store
  const { categories } = useSelector((state) => state?.categories)

  //! form data
  const options = categories?.categories?.map((category) => {
    return {
      value: category?._id,
      label: category?.name
    }
  });

  //* Get  post from store
  const { post, error, loading, success } = useSelector((state) => state?.posts)


  useEffect(() => {
    dispatch(fetchCategoriesAction())
  }, [dispatch])



  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });

  //? 1) Validate form  
  const validateForm = (data) => {
    let errors = {}
    if (!data.title) errors.title = 'Title is required';
    if (!data.image) errors.image = 'Image is required';
    if (!data.category) errors.category = 'Category is required';
    if (!data.content) errors.content = 'Content is required';
    return errors
  }
 


  //! Handle image change (for file)
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //!React select handle change
  const handleSelectChange = (selectedOptions) => {
    setFormData({ ...formData, category: selectedOptions.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
   
      //! dispatch action
      dispatch(updatePostAction({...formData, postId}))
      setFormData({
        title: "",
        image: null,
        category: null,
        content: "",
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Update Post
          </h2>

          {/*error  */}
          {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message='Post Updated successfully' />}

          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            Share your thoughts and ideas with the community
          </h3>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Title</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="text"
              placeholder="Enter the post title"
              name="title"
              value={formData.title}
              onChange={handleChange}
         
            />
          </label>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image"
              onChange={handleFileChange}
         
            />
          
          </label>
          {/* category here */}
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Category</span>
            <Select
              options={options}
              name="category"
              onChange={handleSelectChange}
         
            />
         
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Content</span>
            <textarea
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              placeholder="Write your post content"
              name="content"
              value={formData.content}
              onChange={handleChange}
         
            />
           
          </label>
          {/* button */}
          {
            loading ? (
              <LoadingComponent />
            ) : (
              <button
                className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
                type="submit"
              >
                Update
              </button>
            )
          }
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;