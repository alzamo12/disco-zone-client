import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';
import UserDashboardSidebar from '../Pages/UserDashboard/components/UserDashboardSidebar';
import UserDashboardNavbar from '../Pages/UserDashboard/components/UserDashboardNavbar';


const UserDashboard = () => {
    // const { badge, role } = useUserRoleProvider();
    // console.log(role)
    return (
        // <div className='w-full flex flex-col lg:flex-row'>
        //     <Toaster />
        //     <div className="drawer lg:drawer-open lg:w-1/4 ">
        //         <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        //         <UserDashboardNavbar />
        //         <div className="drawer-side overflow-y-hidden ">
        //             <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        //             <UserDashboardSidebar />
        //         </div>
        //     </div>
        //     {/* outlet */}
        //     <div className='w-full'>
        //         <Outlet />
        //     </div>
        // </div>
        <div className="drawer lg:drawer-open min-h-screen bg-neutral-900 text-white">
            <Toaster />

            {/* hidden checkbox toggles the drawer on mobile */}
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* main content */}
            <div className="drawer-content flex flex-col">
                {/* mobile header with hamburger */}
                <div className="lg:hidden flex items-center justify-between p-4 bg-neutral-800">
                    <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <span className="text-xl font-bold">Dashboard</span>
                </div>

                <div className="lg:p-6 flex-1">
                    <Outlet />
                </div>
            </div>

            {/* sidebar */}
            <div className="drawer-side bg-neutral-800 lg:w-72">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <UserDashboardSidebar
                    onLinkClick={() => {
                        // close drawer on mobile when a link is clicked
                        const toggle = document.getElementById('my-drawer-2');
                        if (toggle) toggle.checked = false;
                    }}
                />
            </div>
        </div>
    );
};

export default UserDashboard;