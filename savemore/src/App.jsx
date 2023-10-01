import React from 'react';
import { HomePage } from './Pages/HomePage';
import { NavBar } from './navBar';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { CreateProduct } from './Pages/CreateProduct';
import { SignIn } from './Pages/SignIn';
import { SignUp } from './Pages/SignUP';
import { EditProduct } from './Pages/EditProduct';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
<div>
  <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route index path='/' element={<HomePage/>}/>
      <Route path='/createproduct' element={<CreateProduct/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/editproduct' element={<EditProduct/>}/>
    </Routes> 
  </BrowserRouter>
  <ToastContainer />
</div>
  )
}
