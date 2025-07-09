import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';
import UserDashboardSidebar from '../Pages/UserDashboard/AddPost/components/UserDashboardSidebar';


const UserDashboard = () => {
    return (
        <div className='w-full flex flex-col lg:flex-row'>
            <Toaster />
            <div className="drawer lg:drawer-open lg:w-1/4 ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center lg:hidden">
                    {/* Page content here */}
                    <div className="navbar bg-base-300 w-full">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2">Navbar Title</div>
                    </div>
                </div>
                <div className="drawer-side overflow-y-hidden ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <UserDashboardSidebar />
                </div>
            </div>
            {/* outlet */}
            <div className='w-full'>
                <Outlet />
            </div>
        </div>
    );
};

export default UserDashboard;