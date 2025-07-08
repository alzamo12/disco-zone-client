import React, { useContext } from 'react';
import { AnnouncementContext } from '../providers/AnnouncementContex';
// import { AnnouncementContext } from '../providers/AnnouncementContex';
const useAnnouncement = () => {
     const useAnnouncement = useContext(AnnouncementContext);
     return useAnnouncement

};

export default useAnnouncement;