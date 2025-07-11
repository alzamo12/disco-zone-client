import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { toast } from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import useUserRoleProvider from '../hooks/useUserRoleProvider';
import LoadingSpinner from '../components/shared/LoadinSpinner';


export default function AdminRoute({redirectTo = '/' }) {
    const { user, logout } = useAuth();
    const { role, loading } = useUserRoleProvider();

    useEffect(() => {
        // If we've checked and user is not admin, log out
        if (!loading && user && role !== 'admin') {
            toast.error('Unauthorized. Logging out...');
            logout();         // your logout function
        }
    }, [loading, user, role, logout]);

    if (loading) {
        return <LoadingSpinner />;
    }

    // If admin, render child routes
    return role === 'admin' ? <Outlet /> : <Navigate to={redirectTo} replace />;
}