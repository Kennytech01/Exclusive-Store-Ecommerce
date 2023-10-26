import React from 'react';
import { AdminPage } from './Pages/AdminPage';
import { HomePage } from './Pages/HomePage';
import { NavBar } from './navBar';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { CreateProduct } from './Pages/CreateProduct';
import { SignIn } from './Pages/SignIn';
import { SignUp } from './Pages/SignUP';
import { EditProduct } from './Pages/EditProduct';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from './Pages/Footer';
import { AdminSignin } from './Pages/adminSignin';
import { AdminSignup } from './Pages/adminSignup';

export const App = () => {
  return (
<div>
  <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route index path='/admin-page' element={<AdminPage/>}/>
      <Route index path='/' element={<HomePage/>}/>
      <Route path='/createproduct' element={<CreateProduct/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/adminsignin' element={<AdminSignin/>}/>
      <Route path='/adminsignup' element={<AdminSignup/>}/>
      <Route path='/editproduct/:id' element={<EditProduct/>}/>
    </Routes> 
    <Footer/>
  </BrowserRouter>
  <ToastContainer />
</div>
  )
}
