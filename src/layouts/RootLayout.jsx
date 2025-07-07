import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <div>
                This is Root layout
            </div>
            <Outlet />
        </div>
    );
};

export default RootLayout;