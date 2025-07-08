import useAnnouncement from "../../../hooks/useAnnouncement";

const AnnouncementsSection = () => {
  const { announcements } = useAnnouncement();

  if (announcements.length === 0) return null;

  return (
    <section className="bg-neutral-800 py-8 px-4 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-success">📢 Announcements</h2>
        <ul className="space-y-3">
          {announcements.map((item) => (
            <li key={item.id} className="bg-white border-l-4 border-green-400 px-4 py-3 shadow rounded-md">
              {item.message}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
