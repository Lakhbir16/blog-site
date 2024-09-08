import './App.css'
import { BrowserRouter, Navigate ,Routes,Route,ScrollRestoration} from 'react-router-dom'
import Nav from './components/nav.jsx'
import Home from './pages/home.jsx'
import Spost from './pages/single-post.jsx'
import YourPost from './pages/your-posts.jsx'
import UserDashboard from './pages/user-dashboard.jsx'
import Footer from './components/footer.jsx'
import CreateNewPost from './pages/create-post.jsx'
import EditPost from './pages/edit-post.jsx'
import Login from './pages/login.jsx'
import SignUpPage from './pages/register.jsx'
import ProtectedRoute from './authRoute/protectedRoute.jsx'
import AuthRoute from './authRoute/AuthRoute.jsx'
import Blog from './pages/blog.jsx'
import Contact from './pages/contact.jsx'
import Profile from './pages/profile.jsx'
import Editprofile from './pages/edit-profile.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  // const token=localStorage.getItem('token')
  // let [userdata, setUserdata] =useState()
  // useEffect(()=>{
  //   async function getdata(){
  //     const res= await axios.post('http://localhost:3002/user/userinfo',{token})
  //     setUserdata(res.data)
  //   }
  //   getdata()
  // },[])

  return (
    <>
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/single-post' element={<Spost />} />
        {/* ---------------------------------------------------------------protected route------------ */}
        <Route element={<ProtectedRoute/>} >

           <Route path='/my-post' element={<YourPost />} />
           <Route path='/dashboard' element={<UserDashboard />} />
           <Route path='/new' element={<CreateNewPost/>} />
           <Route path='/edit' element={<EditPost/>} />
           <Route path='/profile-edit' element={<Editprofile/>} />
        </Route>

        {/* ----------------------------------------------------------------------------------  */}
        
        {
          <Route element={<AuthRoute />}>
             <Route path='/login' element={<Login />} />
             <Route path='/sign-up' element={<SignUpPage />} />
          </Route>
        }
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile/>} />

      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
