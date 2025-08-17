import React from 'react';
import NavLogo from '../../../components/shared/NavLogo';
import { MdDashboard, MdLocalPostOffice, MdOutlineDashboard, MdOutlineLocalPostOffice } from 'react-icons/md';
import { FaNewspaper, FaRegNewspaper, FaRegUser, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router';

const AdminDashboardNavbar = () => {
    return (
        <ul className="menu bg-neutral-800 text-white min-h-full w-72 p-4 space-y-5 relative flex-1">
            {/* Sidebar content here */}
            <NavLogo />
            <ul className='space-y-3'>
                {/* <li className='pb-1 hover:bg-neutral-700 border-b-2 border-white'>
                    <NavLink to="/dashboard" end>
                        {
                            ({ isActive }) => (
                                <div>
                                    <div className={`flex items-center gap-2 hover:bg-neutral-700 p-2 rounded ${isActive ? 'bg-neutral-700' : ''}`}>
                                        {isActive ? <MdDashboard /> : <MdOutlineDashboard />}
                                        <span>Admin dashboard</span>
                                    </div>
                                </div>
                            )
                        }
                    </NavLink></li> */}
                <li className='pb-1 hover:bg-neutral-700 border-b-2 border-white'>
                    <NavLink to="/admin-dashboard/admin-profile">
                        {
                            ({ isActive }) => (
                                <div>
                                    <div className={`flex items-center gap-2 hover:bg-neutral-700 p-2 rounded ${isActive && 'bg-neutral-700'} `}>
                                        {isActive ? <MdLocalPostOffice className='text-white' /> : <MdOutlineLocalPostOffice />}
                                        <span>Admin Profile</span>
                                    </div>
                                </div>
                            )
                        }
                    </NavLink></li>
                <li className='pb-1 hover:bg-neutral-700 border-b-2 border-white'>
                    <NavLink to="/admin-dashboard/manage-users">
                        {
                            ({ isActive }) => (
                                <div>
                                    <div className={`flex items-center gap-2 hover:bg-neutral-700 p-2 rounded ${isActive && 'bg-neutral-700'} `}>
                                        {isActive ? <FaNewspaper className='text-white' /> : <FaRegNewspaper />}
                                        <span>Manages Users</span>
                                    </div>
                                </div>
                            )
                        }
                    </NavLink></li>
                <li className='pb-1 hover:bg-neutral-700 border-b-2 border-white'>
                    <NavLink to="/admin-dashboard/make-announcement">
                        {
                            ({ isActive }) => (
                                <div>
                                    <div className={`flex items-center gap-2 hover:bg-neutral-700 p-2 rounded ${isActive && 'bg-neutral-700'} `}>
                                        {isActive ? <FaUser className='text-white' /> : <FaRegUser />}
                                        <span>Make Announcement</span>
                                    </div>
                                </div>
                            )
                        }
                    </NavLink></li>
                <li className='pb-1 hover:bg-neutral-700 border-b-2 border-white'>
                    <NavLink to="/admin-dashboard/reported-comments">
                        {
                            ({ isActive }) => (
                                <div>
                                    <div className={`flex items-center gap-2 hover:bg-neutral-700 p-2 rounded ${isActive && 'bg-neutral-700'} `}>
                                        {isActive ? <FaUser className='text-white' /> : <FaRegUser />}
                                        <span>Reported Comments</span>
                                    </div>
                                </div>
                            )
                        }
                    </NavLink></li>
                {/* overview page */}
                <li className='pb-1 hover:bg-neutral-700 border-b-2 border-white'>
                    <NavLink to="/admin-dashboard/overview">
                        {
                            ({ isActive }) => (
                                <div>
                                    <div className={`flex items-center gap-2 hover:bg-neutral-700 p-2 rounded ${isActive && 'bg-neutral-700'} `}>
                                        {isActive ? <FaNewspaper className='text-white' /> : <FaRegNewspaper />}
                                        <span>Overview</span>
                                    </div>
                                </div>
                            )
                        }
                    </NavLink></li>
                <li className='pb-1 hover:bg-neutral-700 border-b-2 border-white'>
                    <NavLink to="/admin-dashboard/my-profile">
                        {
                            ({ isActive }) => (
                                <div>
                                    <div className={`flex items-center gap-2 hover:bg-neutral-700 p-2 rounded ${isActive && 'bg-neutral-700'} `}>
                                        {isActive ? <FaNewspaper className='text-white' /> : <FaRegNewspaper />}
                                        <span>My Profile</span>
                                    </div>
                                </div>
                            )
                        }
                    </NavLink></li>
            </ul>
        </ul>
    );
};

export default AdminDashboardNavbar;