import React from 'react';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from "./Components/Layout/Layout";
import Category from "./Components/Category/Category";
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import Orders from "./Components/Orders/Orders";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Brand from "./Components/Brand/Brand";
import UserTokenProvider from './Context/UserToken';
import ProtectRoute from './Components/ProtectRoute/ProtectRoute';
import Profile from './Components/Profile/Profile';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import CheckOut from './Components/CheckOut/CheckOut';
import WishListProvider from './Context/WishListContext';
import WishList from './Components/WishList/WishList';

let routers = createHashRouter({
  basename: '/app',
  routes: [
    {path:"/", element:<Layout/> , children:[
      {path:"login" , element:<Login/>},
      {path:"register" , element: <Register/>},
      {path:"resetpassword" , element: <ResetPassword/>},
      {path:"/" , element: <ProtectRoute><Home/></ProtectRoute>},
      {path:"cart" , element: <ProtectRoute><Cart/></ProtectRoute>},
      {path:"categories" , element: <ProtectRoute><Categories/></ProtectRoute>},
      {path:"profile" , element: <ProtectRoute><Profile/></ProtectRoute>},
      {path:"brands" , element: <ProtectRoute><Brands/></ProtectRoute>},
      {path:"products" , element: <ProtectRoute><Products/></ProtectRoute>},
      {path:"wishlist" , element: <ProtectRoute><WishList/></ProtectRoute>},
      {path:"allorders" , element: <ProtectRoute><Orders/></ProtectRoute>},
      {path:"checkout/:id" , element: <ProtectRoute><CheckOut/></ProtectRoute>},
      {path:"brand/:id" , element: <ProtectRoute><Brand/></ProtectRoute>},
      {path:"category/:slug" , element: <ProtectRoute><Category/></ProtectRoute>},
      {path:"product/:id" , element:<ProtectRoute><ProductDetails/></ProtectRoute> },
      {path:"*" , element: <NotFound/>}
    ]}
  ],
});


export default function App() {

  return <>
    <UserTokenProvider>
      <CartContextProvider>
        <WishListProvider>
        <RouterProvider  router={routers}></RouterProvider>
        </WishListProvider>
        <Toaster/>
      </CartContextProvider>
    </UserTokenProvider>
  </>
}
