import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: roleData, refetch, isLoading: reloading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role-badge/${user?.email}`);
            return res.data
        }
    });

    return { ...roleData, refetch, loading: authLoading || reloading }
};

export default useUserRole;