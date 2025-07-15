import React, { useState } from 'react';
import Banner from '../Banner/Banner';
import Tags from '../Tags/Tags';
import AnnouncementsSection from '../AnnouncementsSection/AnnouncementsSection';
import Posts from '../Posts/Posts';

const Home = () => {
    const [search, setSearch] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const searchText = e.target.tag.value;
        setSearch(searchText)
    };
    return (
        <div className='space-y-20'>
            <Banner handleSubmit={handleSubmit} />
            <Posts search={search} />
            <AnnouncementsSection />
            <Tags />
        </div>
    );
};

export default Home;