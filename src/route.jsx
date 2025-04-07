import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/login/page";
import Register from "./pages/Rigester/Register";
import OtpPage from "./pages/OtpPage/Otp";
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
import Strategy from "./pages/BotTrade/Strategy";
import StrategyList from "./pages/BotTrade/ListStrategy";
import Exchange from "./pages/BotTrade/Exchange";
import ManualTransaction from "./pages/BotTrade/ManualTransaction";
import AccountingBot from "./pages/BotTrade/Accounting";
import TransactionStatus from "./pages/BotTrade/TransactionStatus";
import BotDocument from "./pages/BotTrade/BotDocument";
import StableCondition from "./pages/BotTrade/StableCondition";
import Notification from "./pages/BotTrade/Notification";
import StatisticalViewBot from "./pages/BotTrade/StatisticalViewBot";
import StreamViewTable from "./pages/BotTrade/StreamViewTable";
import ChartSellApi from "./pages/chart-home-page/ChartSellApi";
import DownloadPhoto from "./pages/DownloadPhoto";
import Remaining from "./components/Bot/Remaining";
import PortBot from "./pages/BotTrade/PortBot";
import AccountList from "./pages/BotTrade/AccountList";
import Excel from "./pages/ExcelPage";
import LibelPage from "./pages/Libel";

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
                path: '/excelPage',
                element: <Excel />
            },
            {
                path: "/home/:chartType",
                element : <ChartSellApi />
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
                path: "/download/:id",
                element: <DownloadPhoto />
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
            {
                path : '/bot/strategy',
                element : <Strategy />
            },
            {
                path : '/bot/strategy-list',
                element : <StrategyList />
            },
            {
                path : '/bot/exchange',
                element : <Exchange />
            },
            {
                path :"/bot/transaction",
                element : <ManualTransaction />
            },
            {
                path : "/bot/accounting",
                element : <AccountingBot />
            },
            {
                path :"/bot/document",
                element : <BotDocument />
            },
            {
                path :"/bot/transactionStatus",
                element : <TransactionStatus />
            },
            {
                path :"/bot/stableCondition",
                element : <StableCondition />
            },
            {
                path :"/bot/notification",
                element : <Notification />
            },
            {
                path :"/bot/statisticalViewBot",
                element : <StatisticalViewBot />
            },
            {
                path :"/bot/streamViewTable",
                element : <StreamViewTable />
            },
            {
                path :"/bot/remaining",
                element : <Remaining />
            },
            {
                path :"/bot/port",
                element : <PortBot />
            },
            {
                path : "/bot/account-list",
                element : <AccountList />
            },
            {
                path : "/libel",
                element : <LibelPage />
            }
          
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
            },
            {
                path: 'otp',
                element: <OtpPage />
            }
        ]
    }


])


