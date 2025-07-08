import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import bgImage from '../../../assets/banner1.png';  // ensure you have a banner background image

export default function Banner({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Success")
        if (query.trim()) onSearch(query.trim());
    };

    return (
        <section
            className="relative w-screen bg-cover bg-center hero 
    left-1/2
    right-1/2
    ml-[-50vw]
    mr-[-50vw]"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Overlay for readability */}
            <div className="hero-overlay opacity-50"></div>

            <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-24 lg:py-40">
                <div className="text-center text-white space-y-4 ">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                        Discover Content
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
                        Search forum posts by the tags you used. Find what matters to you.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex justify-center"
                >
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter tag keyword..."
                            className="w-full pl-14 pr-4 py-3 rounded-full bg-white bg-opacity-90 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-success transition"
                        />
                        <button
                            type="submit"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black hover:text-success"
                        >
                            <FaSearch size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
