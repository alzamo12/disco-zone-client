import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import logo from "/logo.png"
const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
            {/* Logo placeholder */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
            >
                <div className="w-24 h-24 rounded-full flex items-center justify-center">
                    <img src={logo} alt="" />
                </div>
            </motion.div>

            {/* Animated error code */}
            <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 120 }}
                className="text-9xl font-extrabold tracking-widest"
            >
                404
            </motion.h1>

            {/* Error message */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4 text-xl text-center max-w-md"
            >
                Oops! The page you're looking for doesn't exist or has been moved.
            </motion.p>

            {/* Back to home button */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8"
            >
                <Link to="/" className="btn btn-primary btn-lg bg-neutral-900 border-white border-[1px]">
                    Go Back Home
                </Link>
            </motion.div>

            {/* Footer animation */}
            <motion.div
                className="absolute bottom-4 text-sm text-gray-500"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                &copy; {new Date().getFullYear()} Disco Zone. All rights reserved.
            </motion.div>
        </div>
    );
};

export default ErrorPage