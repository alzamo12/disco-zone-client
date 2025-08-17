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
    <section className="bg-primary py-8 w-full px-6 md:mx-auto rounded-xl ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-accent">📢 Announcements</h2>
        <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {announcements.map((item) => (
            <li key={item._id} className="bg-white border-l-4 border-accent px-4 py-3 shadow rounded-md h-24 ">
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
