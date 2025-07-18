import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-black text-white w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
            <div className="container mx-auto">
                <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start  space-y-6 md:space-y-0 justify-between" >
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <div className="mb-4">
                            <img src="/logo.png" alt="Logo" className="w-32 filter brightness-125" />
                        </div>
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Disco Zone. All rights reserved.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mx-auto">
                        <div className='flex flex-col'>
                            <span className="footer-title text-gray-300">Product</span>
                            <a className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white" href="#">Features</a>
                            <a className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white" href="#">Pricing</a>
                            <a className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white" href="#">Use Cases</a>
                        </div>
                        <div className='flex flex-col'>
                            <span className="footer-title text-gray-300">Company</span> 
                            <a className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white" href="#">About Us</a>
                            <a className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white" href="#">Careers</a>
                            <a className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white" href="#">Blog</a>
                        </div>
                        <div className='flex flex-col'>
                            <span className="footer-title text-gray-300">Support</span>
                            <a className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white" href="#">Help Center</a>
                            <a className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white" href="#">Contact Us</a>
                            <a className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white" href="#">Privacy Policy</a>
                        </div>
                        <div>
                            <span className="footer-title text-gray-300">Follow Us</span>
                            <div className="flex space-x-4 mt-2">
                                {[
                                    { icon: <FaFacebookF />, href: '#' },
                                    { icon: <FaTwitter />, href: '#' },
                                    { icon: <FaInstagram />, href: '#' },
                                    { icon: <FaLinkedinIn />, href: '#' },
                                ].map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        className="p-2 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 transition-transform transform hover:scale-110"
                                    >
                                        <span className="text-white text-lg">{item.icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
                    Made with ❤️ by Disco Zone
                </div>
            </div>
        </footer>
    );
};

export default Footer
