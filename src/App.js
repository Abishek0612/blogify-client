import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './components/HomePage/HomePage';
import Login from './components/Users/Login';
import UserProfile from './components/Users/UserProfile';
import PublicNavbar from './components/Navbar/PublicNavbar';
import PrivateNavbar from './components/Navbar/PrivateNavbar';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/AuthRoute/ProtectedRoute';
import AddPost from './components/Posts/AddPost';
import PostDetails from './components/Posts/PostDetails';



function App() {
  //!Get the login user from store
  const { userAuth } = useSelector((state) => state?.users)
  const isLogin = userAuth?.userInfo?.token


  const HomePage = () => {
    return <h1>Welcome to blogify</h1>
  }
  return (
    <BrowserRouter>
      {/* Navbar here */}
      {isLogin ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />

       
       //! Protected route
        //!Profile
        <Route path='/user-profile' element={
          <ProtectedRoute >
            <UserProfile />
          </ProtectedRoute>} />

        //!Add Post
        <Route path='/add-post' element={
          <ProtectedRoute >
            <AddPost />
          </ProtectedRoute>} />

        //?Post Details
        <Route path='/posts/:postId' element={
          <ProtectedRoute >
            <PostDetails />
          </ProtectedRoute>} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
