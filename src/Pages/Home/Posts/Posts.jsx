// Posts.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSortAmountDown } from 'react-icons/fa';
import LoadingSpinner from '../../../components/shared/LoadinSpinner';
import { useNavigate } from 'react-router';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { motion } from 'framer-motion';

const Posts = ({ search }) => {
    const axiosPublic = useAxiosPublic();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('new');
    const limit = 10;
    const navigate = useNavigate();

    const { data: posts = [], isLoading, isFetching } = useQuery({
        queryKey: ['homePosts', page, sort, search, limit],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts?sort=${sort}&page=${page}&limit=${limit}&search=${search}`);
            console.log(res.data)
            return res.data;
        }
    });

    const handlePostClick = (id) => {
        navigate(`/post/${id}`);
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-6"
        >
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-3xl font-bold text-sky-400 mb-4 sm:mb-0">🌐 Explore Posts</h1>
                <button
                    className="flex items-center gap-2 border border-sky-500 text-sky-300 hover:bg-sky-700 hover:text-white transition px-4 py-2 rounded-md text-sm"
                    onClick={() => setSort(prev => (prev === 'new' ? 'popular' : 'new'))}
                >
                    <FaSortAmountDown />
                    Sort: {sort === 'new' ? 'Newest' : 'Popular'}
                </button>
            </div>

            {posts?.map(post => (
                <motion.div
                    key={post._id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    onClick={() => handlePostClick(post._id)}
                    className="p-5 bg-slate-800 border border-slate-700 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-300"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <img
                            src={post.authorImage}
                            alt={post.authorName}
                            className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-semibold text-white">{post.title}</h2>
                            <p className="text-sm text-slate-400">
                                {new Date(post.createdAt).toLocaleString()} • {post.commentsCount} comments • {post.upVote -post.downVote} votes
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                            <span  className="bg-sky-700/20 text-sky-300 px-2 py-1 text-xs rounded-md border border-sky-500">
                                #{ post?.tag?.value || post?.tag}
                            </span>
                    </div>
                </motion.div>
            ))}

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
        </motion.div>
    );
};

export default Posts;