import { RouteObject } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import HomeLayout from '../layouts/HomeLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../routing/ProtectedRoute';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';

export const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <HomeLayout><HomePage /></HomeLayout>
    },
    {
        path: '/login',
        element: <AuthLayout><LoginPage /></AuthLayout>
    }
];

export const protectedRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: <AdminLayout><ProtectedRoute><DashboardPage /></ProtectedRoute></AdminLayout>
    }
]