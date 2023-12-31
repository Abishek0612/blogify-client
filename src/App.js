import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage/HomePage";
import Login from "./components/Users/Login";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
import AddPost from "./components/Posts/AddPost";
import PostDetails from "./components/Posts/PostDetails";
import PasswordResetRequest from "./components/Users/PasswordResetRequest";
import { PasswordReset } from "./components/Users/PasswordReset";
import PostList from "./components/Posts/PostList";
import UpdatePost from "./components/Posts/UpdatePost";
import PublicUserProfile from "./components/Users/PublicUserProfile";
import PrivateUserProfile from "./components/Users/PrivateUserProfile";
import UploadProfileImage from "./components/Users/UploadProfileImage";
import UploadCoverImage from "./components/Users/UploadCoverImage";
import AccountVerification from "./components/Users/AccountVerification";
import UpdateUserProfile from "./components/Users/UpdateUserProfile";
import SchedulePost from "./components/Posts/SchedulePost";
import Footer from "./components/Footer/Footer";
import Register from "./components/Users/Register";

function App() {
  //!Get the login user from store
  const { userAuth } = useSelector((state) => state?.users);
  const isLogin = userAuth?.userInfo?.token;

  const HomePage = () => {
    return <h1>Welcome to blogify</h1>;
  };
  return (
    <BrowserRouter>
      {/* Navbar here */}
      {isLogin ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        {/* //! Protected route //!Profile */}
        <Route
          path="/user-public-profile/:userId"
          element={
            <ProtectedRoute>
              <PublicUserProfile />
            </ProtectedRoute>
          }
        />
        {/* //!Add Post */}
        <Route
          path="/add-post"
          element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          }
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        />

        {/* //?Post Details */}
        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        />

        {/* //?Update Profile */}
        <Route
          path="/update-user-profile"
          element={
            <ProtectedRoute>
              <UpdateUserProfile />
            </ProtectedRoute>
          }
        />

        {/* //!Update post */}
        <Route
          path="/posts/:postId/update"
          element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          }
        />
        {/* //?Post List */}
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <PostList />
            </ProtectedRoute>
          }
        />
        {/* //?Private user profile */}
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <PrivateUserProfile />
            </ProtectedRoute>
          }
        />
        {/* //?Upload profile Image */}
        <Route
          path="/upload-profile-image"
          element={
            <ProtectedRoute>
              <UploadProfileImage />
            </ProtectedRoute>
          }
        />

        {/* //! Upload Cover Image */}
        <Route
          path="/upload-cover-image"
          element={
            <ProtectedRoute>
              <UploadCoverImage />
            </ProtectedRoute>
          }
        />
        {/* //! Verify Account  */}
        <Route
          path="/verify-account/:token"
          element={
            <ProtectedRoute>
              <AccountVerification />
            </ProtectedRoute>
          }
        />

        {/* //? Schedule a post  */}
        <Route
          path="/posts/schedule/:postId"
          element={
            <ProtectedRoute>
              <SchedulePost />
            </ProtectedRoute>
          }
        />

        {/* //? Forgot Password request */}
        <Route path="/forgot-password" element={<PasswordResetRequest />} />
        {/* //! reset password */}
        <Route path="/reset-password/:token" element={<PasswordReset />} />

      </Routes>

              {/* Footer */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;
