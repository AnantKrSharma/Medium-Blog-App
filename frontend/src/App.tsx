import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import { AllBlogs } from './pages/AllBlogs';
import { Toaster } from 'react-hot-toast';
import { NewBlog } from './pages/NewBlog';

function App() {

  let loggedIn = null;
  if(localStorage.getItem('token')){
    loggedIn = true;
  }

  return (
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/blogs' element={loggedIn ? <AllBlogs /> : <Navigate to={'/signin'} /> } />
            <Route path='/blog/:id' element={loggedIn ? <Blog /> : <Navigate to={'/signin'} /> } />
            <Route path='/publish' element={loggedIn ? <NewBlog /> : <Navigate to={'/signin'} /> } />
          </Routes>

          <Toaster />
      </BrowserRouter>
  )
}

export default App;
