import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';
import UserDashboardSidebar from '../Pages/UserDashboard/components/UserDashboardSidebar';
import UserDashboardNavbar from '../Pages/UserDashboard/components/UserDashboardNavbar';
import useUserRoleProvider from '../hooks/useUserRoleProvider';
import AdminDashboardNavbar from '../Pages/UserDashboard/components/AdminDashboardNavbar';


const UserDashboard = () => {
    const { badge, role } = useUserRoleProvider();
    // console.log(role)
    return (
        <div className='w-full flex flex-col lg:flex-row'>
            <Toaster />
            <div className="drawer lg:drawer-open lg:w-1/4 ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <UserDashboardNavbar />
                <div className="drawer-side overflow-y-hidden ">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    {/* <UserDashboardSidebar /> */}
                    {role === "user" ?
                        <UserDashboardSidebar />
                        :
                        <AdminDashboardNavbar />
                    }
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