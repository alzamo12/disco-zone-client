// AnnouncementContext.jsx
import { useState, useEffect } from "react";
import { AnnouncementContext } from "./AnnouncementContex";

// Replace this with real API later
const mockFetchAnnouncements = async () => {
    return [
        { id: 1, message: "Site maintenance tonight at 10pm." },
        { id: 2, message: "New features released!" },
    ];
};


 const AnnouncementProvider = ({ children }) => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await mockFetchAnnouncements();
            setAnnouncements(data);
        };
        fetchData();
    }, []);

    return (
        <AnnouncementContext.Provider value={{ announcements }}>
            {children}
        </AnnouncementContext.Provider>
    );
};

export default AnnouncementProvider
