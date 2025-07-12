// CommentsPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const Comments = () => {
    const { postId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch comments for this post
    const { data: comments = [], isLoading } = useQuery({
        queryKey: ['commentsList', postId],
        queryFn: async() => {
           const res = await axiosSecure.get(`/comments/${postId}`);
           console.log(res.data)
           return res.data
        }
    });

    // Local state: feedback selection and reported flags
    const [feedbacks, setFeedbacks] = useState({});
    const [reported, setReported] = useState({});

    const feedbackOptions = [
        'Inappropriate content',
        'Spam or advertising',
        'Harassment or hate speech'
    ];

    const handleFeedbackChange = (commentId, value) => {
        setFeedbacks(prev => ({ ...prev, [commentId]: value }));
    };

    const handleReport = (commentId) => {
        // implement actual API call here if needed
        setReported(prev => ({ ...prev, [commentId]: true }));
    };

    if (isLoading) return <p className="text-center text-white py-10">Loading comments...</p>;

    return (
        <div className="max-w-4xl mx-auto p-4 text-white">
            <h1 className="text-2xl font-bold mb-4">Comments for Post</h1>
            <div className="overflow-x-auto">
                <table className="w-full table-auto bg-neutral-900 rounded-lg">
                    <thead className="bg-neutral-800">
                        <tr>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Comment</th>
                            <th className="px-4 py-2 text-left">Feedback</th>
                            <th className="px-4 py-2 text-left">Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map(comment => (
                            <tr key={comment._id} className="border-b border-neutral-700 hover:bg-neutral-800">
                                <td className="px-4 py-2 align-top">{comment.authorEmail}</td>
                                <td className="px-4 py-2 align-top">{comment.text}</td>
                                <td className="px-4 py-2 align-top">
                                    <select
                                        className="bg-neutral-700 text-white rounded px-2 py-1 w-full"
                                        value={feedbacks[comment._id] || ''}
                                        onChange={e => handleFeedbackChange(comment._id, e.target.value)}
                                    >
                                        <option value="">Select feedback</option>
                                        {feedbackOptions.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-4 py-2 align-top">
                                    <button
                                        className={`px-3 py-1 rounded ${reported[comment._id] ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-700'} text-white`}
                                        disabled={!feedbacks[comment._id] || reported[comment._id]}
                                        onClick={() => handleReport(comment._id)}
                                    >
                                        {reported[comment._id] ? 'Reported' : 'Report'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {!user && (
                <p className="mt-4 text-center text-gray-400">Login to report comments.</p>
            )}
        </div>
    );
};

export default Comments
