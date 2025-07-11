import { useEffect, useState } from 'react';
import { UserRoleContext } from './UserRoleContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

export const UserRoleProvider = ({ children }) => {
    const auth = useAuth();
    const user = auth?.user;
    const axiosSecure = useAxiosSecure();
    const [roleData, setRoleData] = useState({ role: null, badge: null, loading: true });
    useEffect(() => {
        // If no user (logged out), reset state and stop loading
        if (!user || !user.email) {
            setRoleData({ role: null, badge: null, loading: false });
            return;
        }

        // When a user is present, set loading and fetch
        setRoleData(prev => ({ ...prev, loading: true }));
        axiosSecure.get(`/user/role-badge/${user.email}`)
            .then(res => {
                setRoleData({ role: res.data.role, badge: res.data.badge, loading: false })
                console.log(res.data)
            })
            .catch(() => setRoleData({ role: null, badge: null, loading: false }));
    }, [user, axiosSecure]);

    return (
        <UserRoleContext.Provider value={roleData}>
            {children}
        </UserRoleContext.Provider>
    );
};

// export const useUserRoleProvider = useContext(UserRoleContext);