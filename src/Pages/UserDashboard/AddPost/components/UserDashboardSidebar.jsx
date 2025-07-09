import React from 'react';
import NavLogo from '../../../../components/shared/NavLogo';
import { MdDashboard, MdLocalPostOffice, MdOutlineDashboard, MdOutlineLocalPostOffice } from 'react-icons/md';
import { NavLink } from 'react-router';

const UserDashboardSidebar = () => {
    return (
        <ul className="menu bg-neutral-800 text-white min-h-full w-80 p-4 space-y-5 relative">
            {/* Sidebar content here */}
            <NavLogo />
            <ul className='space-y-3'>
                <li className='pb-1 hover:bg-neutral-700 border-b-2 border-white'><NavLink to="/dashboard" end>
                    {
                        ({ isActive }) => (
                            <div>
                                <div className={`flex items-center gap-2 hover:bg-neutral-700 p-2 rounded ${isActive ? 'bg-neutral-700' : ''}`}>
                                    {isActive ? <MdDashboard /> : <MdOutlineDashboard />}
                                    <span>Dashboard</span>
                                </div>
                            </div>
                        )
                    }
                </NavLink></li>
                <li className='pb-1 hover:bg-neutral-700 border-b-2 border-white'><NavLink to="/dashboard/add-post">
                    {
                        ({ isActive }) => (
                            <div>
                                <div className={`flex items-center gap-2 hover:bg-neutral-700 p-2 rounded ${isActive && 'bg-neutral-700'} `}>
                                    {isActive ? <MdLocalPostOffice className='text-white' /> : <MdOutlineLocalPostOffice />}
                                    <span>Add Post</span>
                                </div>
                            </div>
                        )
                    }
                </NavLink></li>
            </ul>
        </ul>
    );
};

export default UserDashboardSidebar;