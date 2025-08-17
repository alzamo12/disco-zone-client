import React, { useState } from 'react';
import Banner from '../Banner/Banner';
import Tags from '../Tags/Tags';
import AnnouncementsSection from '../AnnouncementsSection/AnnouncementsSection';
import Posts from '../Posts/Posts';
import Featured from '../Featured/Featured';
import TopContributors from '../TopContributers/TopContributers';
import JoinConversation from '../JoinConversation/JoinConversation';
import EmailSubscription from '../EmailSubscription/EmailSubscription';

const Home = () => {
    const [search, setSearch] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const searchText = e.target.tag.value;
        setSearch(searchText)
    };
    return (
        <div className='space-y-10 md:space-y-16 lg:space-y-24'>
            <Banner handleSubmit={handleSubmit} />
            <Posts search={search} />
            <AnnouncementsSection />
            <Tags />
            <Featured />
            <TopContributors />
            <EmailSubscription />
            <JoinConversation />
        </div>
    );
};

export default Home;