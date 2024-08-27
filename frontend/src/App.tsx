import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
      <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/blog/:id' element={<Blog />} />
          </Routes>

          <Toaster />
      </BrowserRouter>
  )
}

export default App;
