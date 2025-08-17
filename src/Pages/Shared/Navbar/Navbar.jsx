import { useState } from 'react';
import { NavLink } from 'react-router';
import { Menu, Transition } from '@headlessui/react';
import logo from "../../../assets/new-logo.jpg"
import useAuth from '../../../hooks/useAuth';
import useUserRole from '../../../hooks/useUserRole';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { role } = useUserRole();
    console.log('from navbar user role is', role)

    const { data: announcements } = useQuery({
        queryKey: ['announcementCount'],
        queryFn: async () => {
            const res = await axiosPublic.get("/announcement-count");
            return res.data
        }
    })

    return (
        // Sticky full-width navbar
        <nav className="max-w-screen-2xl mx-auto">
            <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        {/* Logo and Name */}
                        <NavLink to="/" className="flex items-center space-x-2">
                            <div className="avatar">
                                <div className="mask mask-hexagon-2 w-12 h-12">
                                    <img src={logo} />
                                </div>
                            </div>
                            {/* <img className="h-8 w-8 rounded-full" src={logo} alt="Logo" /> */}
                            <span className="font-bold text-xl">Disco Zone</span>
                        </NavLink>
                        {/* Desktop Menu-navlinks */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 text-gray-700 hover:text-gray-900 ${isActive ? 'font-semibold' : ''}`
                                }
                            >
                                Home
                            </NavLink>
                            {/* about us route */}
                            <NavLink
                                to="/about-us"
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 text-gray-700 hover:text-gray-900 ${isActive ? 'font-semibold' : ''}`
                                }
                            >
                                About Us
                            </NavLink>

                            {/* faq us route */}
                            <NavLink
                                to="/faq"
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 text-gray-700 hover:text-gray-900 ${isActive ? 'font-semibold' : ''}`
                                }
                            >
                               FAQ
                            </NavLink>

                            {/* All Posts route */}
                            <NavLink
                                to="/posts"
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 text-gray-700 hover:text-gray-900 ${isActive ? 'font-semibold' : ''}`
                                }
                            >
                               Posts
                            </NavLink>

                            {/* private routes in navbar */}
                            {
                                user &&
                                <>  <NavLink
                                    to="/membership"
                                    className={({ isActive }) =>
                                        `inline-flex items-center px-1 pt-1 text-gray-700 hover:text-gray-900 ${isActive ? 'font-semibold' : ''}`
                                    }
                                >
                                    Membership
                                </NavLink>
                                    <NavLink
                                        to="/dashboard/my-profile"
                                        className={({ isActive }) =>
                                            `inline-flex items-center px-1 pt-1 text-gray-700 hover:text-gray-900 ${isActive ? 'font-semibold' : ''}`
                                        }>
                                        Dashboard
                                    </NavLink></>
                            }
                        </div>
                    </div>

                    {/* Always-visible icons & user section */}
                    <div className="flex items-center space-x-4">
                        {/* Notification Icon */}
                        <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                                <span className="badge badge-sm rounded-full badge-neutral indicator-item">{announcements}</span>
                            </div>
                        </button>

                        {/* Join US or User Menu */}
                        {user ? (
                            <Menu as="div" className="relative">
                                <Menu.Button
                                    className="p-1 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onMouseDown={(e) => e.stopPropagation()}
                                >
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={user?.photoURL}
                                        alt="User avatar"
                                    />
                                </Menu.Button>
                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <div className="px-4 py-2 text-sm text-gray-700">
                                                {user?.displayName}
                                            </div>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink
                                                        to={role === 'admin' ? "/admin-dashboard/admin-overview" : "/dashboard/my-profile"}
                                                        className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                                                    >
                                                        Dashboard
                                                    </NavLink>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={logout}
                                                        className={`w-full text-left block px-4 py-2 text-sm text-red-600 ${active ? 'bg-gray-100' : ''}`}
                                                    >
                                                        Logout
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        ) : (
                            <NavLink
                                to="/login"
                                className="px-4 py-2 text-white rounded-md btn btn-neutral hover:btn-success"
                            >
                                Join US
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-200 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${isActive ? 'font-semibold' : ''}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/membership"
                            className={({ isActive }) =>
                                `block px-4 py-2 text-gray-700 hover:bg-gray-100 ${isActive ? 'font-semibold' : ''}`
                            }
                        >
                            Membership
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Dashboard
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
}