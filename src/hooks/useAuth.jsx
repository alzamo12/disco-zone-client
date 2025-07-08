import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider/AuthContext';


const useAuth = () => {
    const authContext = useContext(AuthContext);
    return authContext
}

export default useAuth;