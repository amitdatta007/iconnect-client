import axios from "axios";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../../Layout/AuthLayout";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import AddProducts from "../../Pages/Dashboard/AddProducts/AddProducts";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import ReportedProducts from "../../Pages/Dashboard/ReportedProducts/ReportedProducts";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import NotFound from "../../Pages/NotFound/NotFound";
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
                element: <PrivateRoute><Products /></PrivateRoute>,
                loader: ({params}) => axios(`https://iconnect-server.vercel.app/products/${params.id}`)
            },
            {
                path: '/blog',
                element: <Blog />
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
            {
                path: '/dashboard/myproduct',
                element: <MyProducts />
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders />
            },
            {
                path: '/dashboard/reportedProducts',
                element: <ReportedProducts />
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment />,
                loader: ({params}) => axios(`https://iconnect-server.vercel.app/booking?id=${params.id}`) 
            }
        ]
    },
    {
        path: '/*',
        element: <NotFound />
    }

]);

export default router;