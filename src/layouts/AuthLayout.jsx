import { NavLink, Outlet } from 'react-router';
import authImg from "../assets/banner1.png"
import logo from "../assets/new-logo.jpg"
const AuthLayout = () => {
    return (
        <div
            className="hero min-h-screen relative"
            style={{
                backgroundImage:
                    `url(${authImg})`,
            }}
        >

            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center relative my-5 py-10">
                <NavLink to="/" className="flex items-center space-x-2 absolute z-10 top-0 left-0">
                    <div className="avatar">
                        <div className="mask mask-hexagon-2 w-12 h-12">
                            <img src={logo} />
                        </div>
                    </div>
                    {/* <img className="h-8 w-8 rounded-full" src={logo} alt="Logo" /> */}
                    <span className="font-bold text-xl text-white">Disco Zone</span>
                </NavLink>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;