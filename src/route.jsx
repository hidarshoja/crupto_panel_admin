import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/login/page";
import Register from "./pages/Rigester/Register";
import HomePage from "./pages/HomePage";
import CustomerDefinition from "./pages/CustomerDefinition";
import Accounting from "./pages/Accounting";
import DocumentPage from "./pages/DocumentPage";
import AccessLevels from "./pages/AccessLevels";


export const route = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/customer_definition',
                element: <CustomerDefinition />
            },
            {
                path: '/accounting',
                element: <Accounting />
            },
            {
                path: '/document',
                element: <DocumentPage />
            },
            {
                path: '/accessLevels',
                element: <AccessLevels />
            },
            // {
            //     path: '/address',
            //     element: <AddressPage />
            // },
            // {
            //     path: '/create',
            //     element: <CreatePage />
            // },
         
           
            // {
            //     path: '/password',
            //     element: <Password />
            // }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }


])