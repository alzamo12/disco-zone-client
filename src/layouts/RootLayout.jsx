import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div className='max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-screen-2xl mx-auto'>
            <div className='bg-white shadow-md fixed top-0 inset-x-0 z-50 '>
                <Navbar />
            </div>
            <div className='h-screen my-20'>
                <Outlet />
            </div>
        </div>
    );
};

export default RootLayout;