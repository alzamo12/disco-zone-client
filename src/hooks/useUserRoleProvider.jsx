import React, { useContext } from 'react';
import { UserRoleContext } from '../providers/UserRoleContext/UserRoleContext';

const useUserRoleProvider = () => {
    const value = useContext(UserRoleContext)
    return value
};

export default useUserRoleProvider;