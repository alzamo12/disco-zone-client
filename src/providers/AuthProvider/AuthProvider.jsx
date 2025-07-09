import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../../firebase/firebase.config"
import { AuthContext } from "./AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosSecure = useAxiosSecure();

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const updateUser = name => {
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    };

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const logout = async () => {
        sessionStorage.removeItem('entry_alert_shown')
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(false)
            setUser(currentUser)
            // sessionStorage.removeItem('entry_alert_shown')
            //  sessionStorage.removeItem('entry_alert_shown')
            if (currentUser) {
                const userData = {
                    name: currentUser?.displayName,
                    email: currentUser?.email,
                    photoURL: currentUser?.photoURL
                };
                const res = await axiosSecure.post("/user", userData);
                console.log(res.data)
            }
            console.log(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [axiosSecure])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        updateUser,
        logout,
        googleLogin
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;