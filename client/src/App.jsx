import React from 'react';
import { AdminPage } from './Pages/AdminPage';
import { HomePage } from './Pages/HomePage';
import { NavBar } from './Component/navBar';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import { CreateProduct } from './Pages/CreateProduct';
import { SignIn } from './Pages/SignIn';
import { SignUp } from './Pages/SignUP';
import { EditProduct } from './Pages/EditProduct';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from './Component/Footer';
import { AdminSignin } from './Pages/adminSignin';
import { AdminSignup } from './Pages/adminSignup';
import { ProductDetail } from './Component/ProductDetail';

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
      {/* <Route path='/adminsignin' element={<AdminSignin/>}/> */}
      <Route path='/adminsignup' element={<AdminSignup/>}/>
      <Route path='/editproduct/:id' element={<EditProduct/>}/>
      <Route path='/product/:id' element={<ProductDetail/>} />
    </Routes> 
    <Footer/>
  </BrowserRouter>
  <ToastContainer />
</div>
  )
}
