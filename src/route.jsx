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
import Statistical from "./pages/Statistical";
import StatusPage from "./pages/StatusPage";
import KycUser from "./pages/KycUser";
import UserDefinition from "./pages/UserDefinition";
import UserAccessLevels from "./pages/UserAccessLevels";
import AccountingUser from "./pages/AccountingUser";
import DocumentPageUser from "./pages/DocumentPageUser"
import StatisticalUser from "./pages/StatisticalUser";

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
            {
                path: '/statistical',
                element: <Statistical />
            },
            {
                path: '/status',
                element: <StatusPage />
            },
             {
                path: '/user/kyc',
                element: <KycUser />
            },
            {
                path: '/user/definition',
                element: <UserDefinition />
            },
            {
                path: '/user/accesslevels',
                element: <UserAccessLevels />
            },
            {
                path: '/user/Accounting',
                element: <AccountingUser />
            },
            {
                path: '/user/document',
                element: <DocumentPageUser />
            },
            {
                path: '/user/statistical',
                element: <StatisticalUser />
            },
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