import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import { AllBlogs } from './pages/AllBlogs';
import { Toaster } from 'react-hot-toast';
import { NewBlog } from './pages/NewBlog';

function App() {

  return (
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/blogs' element={<AllBlogs />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route path='/publish' element={<NewBlog />} />
          </Routes>

          <Toaster />
      </BrowserRouter>
  )
}

export default App;
