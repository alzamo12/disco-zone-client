import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSortAmountDown } from 'react-icons/fa';
import LoadingSpinner from '../../../components/shared/LoadinSpinner';
import { Link, useNavigate } from 'react-router';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Posts = () => {
    const axiosPublic = useAxiosPublic();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('new'); // 'new' or 'popular'
    const limit = 5;
    const navigate = useNavigate();

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['homePosts', page, sort],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts?sort=${sort}&page=${page}&limit=${limit}`);
            return res.data
        }
    });

    const handlePostClick = (id) => {
        navigate(`/post/${id}`)
    }

    if (isLoading) return <LoadingSpinner />

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Home</h1>
                <button
                    className="btn btn-outline flex items-center"
                    onClick={() => setSort(prev => (prev === 'new' ? 'popular' : 'new'))}
                >
                    <FaSortAmountDown className="mr-2" />
                    Sort: {sort === 'new' ? 'Newest' : 'Popular'}
                </button>
            </div>

            {posts?.map(post => (
                <div
                    onClick={() => handlePostClick(post._id)}
                    key={post._id}
                    className="p-4 border rounded-lg hover:shadow-md transition cursor-pointer"
                >
                    <div className="flex items-center space-x-3 mb-2">
                        <img
                            src={post.authorImage}
                            alt={post.authorName}
                            className="h-10 w-10 rounded-full"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-sm text-gray-500">
                                {new Date(post.createdAt).toLocaleString()} • {post.commentCount} comments • {post.voteDifference} votes
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {post?.tags?.map(tag => (
                            <span key={tag} className="badge badge-outline">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}

            {/* Pagination controls */}
            <div className="flex justify-center space-x-4 mt-6">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="btn btn-sm"
                >Previous</button>
                <span>Page {page}</span>
                <button
                    onClick={() => setPage(prev => prev + 1)}
                    className="btn btn-sm"
                >Next</button>
            </div>
        </div>
    );
};

export default Posts