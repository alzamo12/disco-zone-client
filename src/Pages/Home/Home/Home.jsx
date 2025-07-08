import React from 'react';
import Banner from '../Banner/Banner';
import Tags from '../Tags/Tags';
import AnnouncementsSection from '../AnnouncementsSection/AnnouncementsSection';

const Home = () => {
    return (
        <div className='space-y-20'>
            <Banner />
            <Tags />
            <AnnouncementsSection />
        </div>
    );
};

export default Home;