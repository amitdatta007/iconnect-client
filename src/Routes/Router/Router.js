import axios from "axios";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../../Layout/AuthLayout";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AddProducts from "../../Pages/Dashboard/AddProducts/AddProducts";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Products from "../../Pages/Products/Products/Products";
import Signup from "../../Pages/Signup/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/catagory/:id',
                element: <Products />,
                loader: ({params}) => axios(`http://localhost:5000/products/${params.id}`)
            }
        ]
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard/allbuyers',
                element: <AllBuyers />
            },
            {
                path: '/dashboard/allsellers',
                element: <AllSellers />
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProducts />
            },
        ]
    }

]);

export default router;