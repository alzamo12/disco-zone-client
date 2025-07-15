import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoadingSpinner from "../../../components/shared/LoadinSpinner";

const AnnouncementsSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcement'],
    queryFn: async () => {
      const res = await axiosPublic.get("/announcements");
      return res.data
    }
  })
  if (isLoading) return <LoadingSpinner />
  if (announcements.length === 0) return null;

  return (
    <section className="bg-neutral-800 py-8 max-w-5xl px-6 mx-auto rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-success">📢 Announcements</h2>
        <ul className="space-y-3">
          {announcements.map((item) => (
            <li key={item._id} className="bg-white border-l-4 border-green-400 px-4 py-3 shadow rounded-md">
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
