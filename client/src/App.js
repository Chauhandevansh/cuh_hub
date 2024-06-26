import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import Password from './components/Password';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';
import UserName from './components/UserName';
import BlogHome from './components/BlogHome';
import AddBlog from './components/AddBlog';
import MyBlogs from './components/MyBlogs';
import UpdateBlog from './components/UpdateBlog';
import FullBlog from './components/FullBlog';
import Split from './components/Split';
import ProductHome from './components/Product/productHome';
import FullProduct from './components/Product/FullProduct';
import AddProduct from './components/Product/AddProduct';
import MyProducts from './components/Product/MyProducts';
import UpdateProductCard from './components/Product/UpdateProductCard';



//Authorizatin Middleware
//test comment
import { AuthorizeUser, ProtectRoute } from './middleware/auth';


// root routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <UserName></UserName>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/password',
        element: <ProtectRoute><Password/></ProtectRoute>
    },
    {
        path: '/profile',
        element: <AuthorizeUser><Profile/></AuthorizeUser>
    },
    {
        path: '/recovery',
        element: <Recovery></Recovery>
    },
    {
        path: '/reset',
        element: <Reset></Reset>
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    },
    {
        path: '/bloghome',
        element: <BlogHome></BlogHome>
    },
    {
        path: '/addblog',
        element: <AddBlog></AddBlog>
    },
    {
        path: '/myblogs',
        element: <MyBlogs></MyBlogs>
    },
    {
        path: '/updateblog/:blogId',
        element: <UpdateBlog />,
    },
    {
        path: '/fullblog/:blogId',
        element: <FullBlog />,
    },
    {
        path: '/split',
        element: <Split />
    },
    {
        path: '/prodhome',
        element: <ProductHome />
    },
    {
        path: '/product/:productId',
        element: <FullProduct />
    },
    {
        path: '/addproduct',
        element: <AddProduct />
    },
    {
        path: '/myproducts',
        element: <MyProducts />
    },
    {
        path: '/updateproduct/:prodId',
        element: <UpdateProductCard />
    }

])


function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    );
}

export default App;