import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSortAmountDown } from "react-icons/fa";
import LoadingSpinner from "../../components/shared/LoadinSpinner";
import Post from "../Home/Posts/Post";
import { useNavigate } from "react-router";

const AllPosts = () => {
    const axiosPublic = useAxiosPublic();
    const [sort, setSort] = useState("new");
    const navigate = useNavigate();
    const limit = 10;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        refetch
    } = useInfiniteQuery({
        queryKey: ["posts", sort],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await axiosPublic.get(
                `/posts?sort=${sort}&page=${pageParam}&limit=${limit}`
            );
            return { ...res.data, page: pageParam }; // add current page
        },
        getNextPageParam: (lastPage) => {
            const totalPages = Math.ceil(lastPage.postsCount / limit);
            return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
        },
    });

    const handlePostClick = (id) =>{
        navigate(`/post/${id}`)
    }

    const posts = data?.pages.flatMap((page) => page.posts) || [];

    if (isLoading) return <LoadingSpinner />;

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white xl:min-h-screen space-y-5"
        >
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-3xl font-bold text-sky-400 mb-4 sm:mb-0">
                    🌐 All Posts
                </h1>
                <button
                    className="flex items-center gap-2 border border-sky-500 text-sky-300 hover:bg-sky-700 hover:text-white transition px-4 py-2 rounded-md text-sm"
                    onClick={() => {
                        setSort((prev) => (prev === "new" ? "popular" : "new"));
                        refetch();
                    }}
                >
                    <FaSortAmountDown />
                    Sort: {sort === "new" ? "Newest" : "Popular"}
                </button>
            </div>

            <InfiniteScroll
                dataLength={posts.length}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={<p className="text-center text-sky-500 mt-6">Loading...</p>}
                scrollThreshold={0.9}
            >
                <motion.div
                    className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } },
                    }}
                >
                    {posts.map((post) => {
                        const commentsCount = post?.comments?.length || 0;
                        return (
                            // <motion.div
                            //     key={post._id}
                            //     whileHover={{ scale: 1.01 }}
                            //     whileTap={{ scale: 0.98 }}
                            //     transition={{ type: "spring", stiffness: 200 }}
                            //     className="p-5 bg-slate-800 border border-slate-700 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-300 h-48 flex flex-col justify-between"
                            // >
                            //     <div className="flex items-center gap-3 mb-3">
                            //         <img
                            //             src={post.authorImage}
                            //             alt={post.authorName}
                            //             className="h-10 w-10 rounded-full object-cover"
                            //         />
                            //         <div>
                            //             <h2 className="text-lg font-semibold text-white line-clamp-1">
                            //                 {post.title}
                            //             </h2>
                            //             <p className="text-sm text-slate-400">
                            //                 {new Date(post.createdAt).toLocaleString()} •{" "}
                            //                 {commentsCount} comments • {post.upVote - post.downVote} votes
                            //             </p>
                            //         </div>
                            //     </div>
                            //     <div className="flex flex-wrap items-center justify-between gap-2">
                            //         <span className="bg-sky-700/20 text-sky-300 px-2 py-1 text-xs rounded-md border border-sky-500">
                            //             #{post?.tag?.value || post?.tag}
                            //         </span>
                            //         <button
                            //             onClick={() => handlePostClick(post._id)}
                            //             className="btn shadow-none text-sky-300 bg-sky-700/20 border-sky-500 px-3 py-1 text-sm rounded-md hover:bg-sky-700/30 transition"
                            //         >
                            //             See more
                            //         </button>
                            //     </div>
                            // </motion.div>
                            <Post post={post} handlePostClick={handlePostClick}/>
                        );
                    })}
                </motion.div>
            </InfiniteScroll>

            {isFetchingNextPage && (
                <p className="text-center text-sky-500 mt-6">Loading more posts...</p>
            )}
        </motion.section>
    );
};

export default AllPosts;
