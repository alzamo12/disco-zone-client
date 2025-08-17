import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';

const Footer = () => {
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const navigate = useNavigate();
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mx-auto w-full justify-between">
                        <div className='flex flex-col justify-self-start text-left'>
                            <span className="footer-title text-gray-300">Product</span>
                            <Link to="/posts"><a className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white" href="#">Posts</a></Link>
                            <button onClick={() => scrollToSection("contribute")} className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white" href="#">Contributors</button>
                        </div>
                        <div className='flex flex-col justify-self-left text-left'>
                            <span className="footer-title text-gray-300">Company</span>
                            <button onClick={() => navigate("/about-us")} className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white text-left" >About Us</button>
                            <button onClick={() => scrollToSection('featured')} className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white text-left" >Featured</button>
                        </div>
                        <div className='flex flex-col'>
                            <span className="footer-title text-gray-300">Support</span>
                            <button onClick={() => scrollToSection("subscribe")} className="link link-hover text-gray-500 transition-colors duration-300 hover:text-white text-left" href="#">Subscribe</button>

                        </div>

                        <div>
                            <span className="footer-title text-gray-300">Follow Us</span>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                {[
                                    { icon: <FaFacebookF />, href: '#' },
                                    { icon: <FaTwitter />, href: '#' },
                                    { icon: <FaInstagram />, href: '#' },
                                    { icon: <FaLinkedinIn />, href: '#' },
                                ].map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        className="p-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 transition-transform transform hover:scale-110 flex justify-center items-center"
                                    >
                                        <span className="text-white text-lg mx-auto">{item.icon}</span>
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
