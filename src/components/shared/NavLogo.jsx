import { NavLink } from "react-router";
import logo from "../../assets/new-logo.jpg"

const NavLogo = () => {
    return (
        <NavLink to="/" className="flex items-center space-x-2  z-10 top-0 left-0">
            <div className="avatar">
                <div className="mask mask-hexagon-2 w-12 h-12">
                    <img src={logo} />
                </div>
            </div>
            {/* <img className="h-8 w-8 rounded-full" src={logo} alt="Logo" /> */}
            <span className="font-bold text-xl text-white">Disco Zone</span>
        </NavLink>
    );
};

export default NavLogo;