import React from 'react';

const UserDashboardNavbar = () => {
    return (
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
                <div className="mx-2 flex-1 px-2">Disco Zone</div>
            </div>
        </div>
    );
};

export default UserDashboardNavbar;