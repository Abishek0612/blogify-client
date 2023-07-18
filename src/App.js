import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './components/HomePage/HomePage';
import Login from './components/Users/Login';
import UserProfile from './components/Users/UserProfile';
import PublicNavbar from './components/Navbar/PublicNavbar';
import PrivateNavbar from './components/Navbar/PrivateNavbar';


function App() {

  const HomePage = () => {
    return<h1>Welcome to blogify</h1>
  }
  return (
    <BrowserRouter>
    {/* Navbar here */}
    <PublicNavbar />
    <PrivateNavbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />

        //!Profile
        <Route path='/user-profile' element={<UserProfile />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
