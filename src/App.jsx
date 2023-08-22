import React, { useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import ProtectedRoute from './features/auth/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCartTotalItemsAsync } from './features/cart/CartSlice';
import { selectLogedInUser } from './features/auth/authSlice';
import MyorderPage from './pages/MyorderPage';
import PageNotFound from './pages/404';
import OrderSuccess from './pages/orderSuccess';
import UserProfile from './pages/UserProfilePage';
import Navbar from './features/Navbar/Navbar';
import Logout from './features/auth/components/Logout';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import AdminProductListPage from './pages/AdminProductListPage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import ProtectedAdmin from './features/auth/ProtectedAdmin';
import AdminProductForm from './pages/AdminProductForm';
import UserOrderPage from './pages/UserOrderPage';



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute> <Home/> </ProtectedRoute>
    
    ),
  },
  {
    path: "/login",
    element: (
     
    <LoginPage/>
   ),
  },
  {
    path: "/signup",
    element: (
     
    <SignUpPage/>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <CartPage/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
      <Navbar>
      <Checkout/>
      </Navbar>
 </ProtectedRoute>),
  },
  {
    path: "/productdetail/:id",
    element: (
      <ProtectedRoute>
    <ProductDetails/>
    </ProtectedRoute>),
  },
 
  {
    path: "/order-success/:id",
    element: (
      <ProtectedRoute>
    <OrderSuccess/>
    </ProtectedRoute>),
  },
  {
    path: "/user-orders",
    element: (
      <ProtectedRoute>
    <MyorderPage/>
    </ProtectedRoute>),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
    <UserProfile/>
    </ProtectedRoute>),
  },

  {
    path: "/logout",
    element: (
      <ProtectedRoute>
    <Logout/>
    </ProtectedRoute>),
  },

  {
    path: "/forgetPassword",
    element: (
    <ForgetPasswordPage/>
    )
  },

  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminProductListPage/>
      </ProtectedAdmin>
    
    )
  },

  {
    path: "/admin/product-details/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage/>
      </ProtectedAdmin>
    
    )
  },

  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductForm/>
      </ProtectedAdmin>
    
    )
  },

  {
    path: "/admin/product-form/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductForm/>
      </ProtectedAdmin>
    
    )
  },

  {
    path: "/admin/userOrders",
    element: (
      <ProtectedAdmin>
        <UserOrderPage/>
      </ProtectedAdmin>
    
    )
  },

  {
    path: "*",
    element: (
    <PageNotFound/>
    )
  },
]);


const App = () => {

//fetch all items from cart
const dispatch = useDispatch();
const loginData =  localStorage.getItem('loginData');
const data = JSON.parse(loginData)

if(loginData){
  const id = data.id;
  useEffect(()=>{
    dispatch(fetchUserCartTotalItemsAsync(
      {userId : id}
    ))
  },[])

}

  return (
    <div>
     <RouterProvider router={router} />
    </div>
  )
}

export default App


