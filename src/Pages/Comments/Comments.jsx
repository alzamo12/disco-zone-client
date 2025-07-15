// CommentsPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { showReportSuccess } from '../../utils/alerts/ShowRepotSuccess';
import LoadingSpinner from '../../components/shared/LoadinSpinner';

const Comments = () => {
    const { postId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const MySwal = withReactContent(Swal);
    const queryClient = useQueryClient();

    // Fetch comments for this post
    const { data: comments, isLoading } = useQuery({
        queryKey: ['commentsList', postId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${postId}`);
            return res.data
        }
    });

    const { mutateAsync } = useMutation({
        mutationFn: async ({ commentId, feedback }) => {
            const res = await axiosSecure.put(`/comment/report/${commentId}`, { feedback });
            return res.data
        },
        onSuccess: (result) => {
            if (result?.modifiedCount > 0) {
                queryClient.invalidateQueries({ queryKey: ["commentsList", postId] })
                showReportSuccess();
                console.log(result)
            }
        }
    })

    // Local state: feedback selection and reported flags
    const [feedbacks, setFeedbacks] = useState({});

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

        MySwal.fire({
            title: '<span class="text-red-400 text-xl font-bold">Report This Comment?</span>',
            html: `
                    <p class="text-gray-300 text-sm">
                         This action will notify admins. Abuse of this feature may result in restrictions.
                    </p>
    `,
            icon: 'warning',
            background: '#111827', // dark-gray
            color: '#e5e7eb',       // light text
            showCancelButton: true,
            confirmButtonText: 'Yes, report it',
            cancelButtonText: 'Cancel',
            buttonsStyling: false,
            customClass: {
                popup: 'rounded-xl shadow-2xl p-6',
                title: 'mb-2',
                htmlContainer: 'mb-4',
                confirmButton: 'bg-red-600 hover:bg-red-500 focus:ring-2 focus:ring-red-400 rounded-md px-4 py-2 text-white mx-2',
                cancelButton: 'bg-gray-700 hover:bg-gray-600 rounded-md px-4 py-2 text-white mx-2',
            },
            showClass: {
                popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
            },
        }).then(result => {
            if (result.isConfirmed) {
                const feedback = feedbacks[commentId];
                const mutateData = {
                    commentId,
                    feedback
                }
                mutateAsync(mutateData)
            }
        })
    };


    if (isLoading) return <LoadingSpinner />


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
                                        className={`px-3 py-1 rounded cursor-pointer ${comment?.reported ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-700'} text-white`}
                                        disabled={!feedbacks[comment._id] || comment?.reported}
                                        onClick={() => handleReport(comment._id)}
                                    >
                                        {comment?.reported ? 'Reported' : 'Report'}
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
