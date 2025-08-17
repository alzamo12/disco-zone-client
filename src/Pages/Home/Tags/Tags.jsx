import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Tags = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { data: allTags } = useQuery({
        queryKey: ['tag'],
        queryFn: async () => {
            const res = await axiosPublic.get("/tags");
            return res.data
        }
    })


    const handleTagClick = (tag) => {
        navigate(`/search?tag=${encodeURIComponent(tag)}`);
    };

    return (
        <section className="bg-primary py-10 px-4  md:px-8 rounded-xl w-full md:mx-auto">
            <div className="w-full mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-white">Browse by Tag</h2>

                <div className="flex flex-wrap gap-3">
                    {allTags?.map((tag) => (
                        <button
                            key={tag._id}
                            onClick={() => handleTagClick(tag?.tag)}
                            className="btn text-sm px-4 py-2 rounded-full btn-outline border-accent text-white hover:bg-primary transition"
                        >
                            #{tag?.tag}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tags;
