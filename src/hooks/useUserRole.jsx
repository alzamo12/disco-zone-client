import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: roleData, refetch, isLoading: reloading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/role-badge/${user?.email}`);
            console.log(res.data)
            return res.data
        }
    });

    return { ...roleData, refetch, loading: authLoading || reloading }
};

export default useUserRole;