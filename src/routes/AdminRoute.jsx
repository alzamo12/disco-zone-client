import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import LoadingSpinner from "../components/shared/LoadinSpinner"
import { Navigate } from 'react-router';
const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const { role, loading: roleLoading } = useUserRole();
    if (loading || roleLoading) {
        return <LoadingSpinner />
    };

    if(!user || role !== 'admin'){
        return <Navigate to="/forbidden"></Navigate>
    }


    return children
};

export default AdminRoute;