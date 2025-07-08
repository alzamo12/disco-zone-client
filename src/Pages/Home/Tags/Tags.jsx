import { useNavigate } from "react-router";

// Sample tag list (replace with dynamic data if needed)
const allTags = [
    "JavaScript", "React", "Node.js", "MongoDB", "Tailwind",
    "Next.js", "Authentication", "Design", "Performance", "UI/UX",
];

const Tags = () => {
    const navigate = useNavigate();

    const handleTagClick = (tag) => {
        // You could navigate to a search route with query params
        navigate(`/search?tag=${encodeURIComponent(tag)}`);
    };

    return (
        <section className="bg-neutral-800 py-10 px-4  rounded-full">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-white">Browse by Tag</h2>

                <div className="flex flex-wrap gap-3">
                    {allTags?.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className="bg-white border border-gray-300 text-gray-800 text-sm px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition"
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tags;
