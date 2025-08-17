import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../components/shared/LoadinSpinner";
import { FaSortAmountDown } from "react-icons/fa";

const AllPosts = ({ handlePostClick }) => {
    const axiosPublic = useAxiosPublic();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('new');
    const limit = 10;
    const navigate = useNavigate();

    const { data: posts = [], isLoading, isFetching } = useQuery({
        queryKey: ['post', page, sort, limit],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts?sort=${sort}&page=${page}&limit=${limit}`);
            // console.log(res.data)
            return res.data;
        }
    });

    if (isLoading || isFetching) return <LoadingSpinner />
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className=" text-white py-16 xl:min-h-screen space-y-5" >

            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-3xl font-bold text-sky-400 mb-4 sm:mb-0">🌐 All Posts</h1>
                <button
                    className="flex items-center gap-2 border border-sky-500 text-sky-300 hover:bg-sky-700 hover:text-white transition px-4 py-2 rounded-md text-sm"
                    onClick={() => setSort(prev => (prev === 'new' ? 'popular' : 'new'))}
                >
                    <FaSortAmountDown />
                    Sort: {sort === 'new' ? 'Newest' : 'Popular'}
                </button>
            </div>
            <motion.div
                className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.15, // each post animates with delay
                        },
                    },
                }}
            >
                {posts?.map((post, index) => {
                    const commentsCount = post?.comments?.length || 0;
                    return (
                        <motion.div
                            key={post._id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="p-5 bg-slate-800 border border-slate-700 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-300 h-48 flex flex-col justify-between"
                        >
                            {/* Post Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src={post.authorImage}
                                    alt={post.authorName}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-white line-clamp-1">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-slate-400">
                                        {new Date(post.createdAt).toLocaleString()} •{" "}
                                        {commentsCount} comments • {post.upVote - post.downVote} votes
                                    </p>
                                </div>
                            </div>

                            {/* Footer with tag + button */}
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="bg-sky-700/20 text-sky-300 px-2 py-1 text-xs rounded-md border border-sky-500">
                                    #{post?.tag?.value || post?.tag}
                                </span>
                                <button
                                    onClick={() => handlePostClick(post._id)}
                                    className="btn shadow-none text-sky-300 bg-sky-700/20 border-sky-500 px-3 py-1 text-sm rounded-md hover:bg-sky-700/30 transition"
                                >
                                    See more
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
            <div className="flex justify-center gap-4 pt-6">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 text-white rounded transition"
                >Previous</button>
                <span className="text-slate-300 font-medium">Page {page}</span>
                <button
                    onClick={() => setPage(prev => prev + 1)}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded transition"
                    disabled={posts?.length < limit || isFetching}
                >Next</button>
            </div>
        </motion.section>
    );
};

export default AllPosts