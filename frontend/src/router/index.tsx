import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../pages/Login";
import { DashboardPage } from "../pages";
import DevicePage from "../pages/DevicePage";
import Cookies from "js-cookie";

const privateLoader = () => {
    const loginToken = Cookies.get('loginToken')
    if (!loginToken) {
        return redirect('/login')
    }

    return null
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardPage />,
        loader: privateLoader
    },
    {
        path: '/login',
        element: <LoginPage />,
        loader: () => {
            const loginToken = Cookies.get('loginToken')
            if (loginToken) {
                return redirect('/')
            }

            return null
        }
    },
    {
        path: '/device/:id',
        element: <DevicePage />,
        loader: privateLoader
    }
])

export default router