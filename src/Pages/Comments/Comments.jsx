// CommentsPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
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

    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 10;

    const { data: commentsData, isLoading } = useQuery({
        queryKey: ['commentsList', postId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${postId}?limit=${commentsPerPage}&page=${currentPage}`);
            console.log(res.data)
            return res.data;
        },
    });

    const { mutateAsync } = useMutation({
        mutationFn: async ({ commentId, feedback }) => {
            const res = await axiosSecure.put(`/comment/report/${commentId}`, { feedback });
            return res.data;
        },
        onSuccess: (result) => {
            if (result?.modifiedCount > 0) {
                queryClient.invalidateQueries({ queryKey: ['commentsList', postId] });
                showReportSuccess();
            }
        },
    });

    const [feedbacks, setFeedbacks] = useState({});
    const feedbackOptions = ['Inappropriate content', 'Spam or advertising', 'Harassment or hate speech'];

    const handleFeedbackChange = (commentId, value) => {
        setFeedbacks((prev) => ({ ...prev, [commentId]: value }));
    };

    const handleReport = (commentId) => {
        MySwal.fire({
            title: '<span class="text-red-400 text-xl font-bold">Report This Comment?</span>',
            html: `<p class="text-gray-300 text-sm">This action will notify admins. Abuse of this feature may result in restrictions.</p>`,
            icon: 'warning',
            background: '#0f172a',
            color: '#e2e8f0',
            showCancelButton: true,
            confirmButtonText: 'Yes, report it',
            cancelButtonText: 'Cancel',
            buttonsStyling: false,
            customClass: {
                popup: 'rounded-xl shadow-xl p-6',
                title: 'mb-2',
                htmlContainer: 'mb-4',
                confirmButton: 'bg-rose-600 hover:bg-rose-500 focus:ring-2 focus:ring-rose-400 rounded-md px-4 py-2 text-white mx-2',
                cancelButton: 'bg-slate-700 hover:bg-slate-600 rounded-md px-4 py-2 text-white mx-2',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const feedback = feedbacks[commentId];
                mutateAsync({ commentId, feedback });
            }
        });
    };



    if (isLoading) return <LoadingSpinner />;
    const { comments, commentsCount } = commentsData;
    const totalPages = Math.ceil(commentsCount / commentsPerPage);
    const paginatedComments = comments?.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage);

    return (
        <motion.div
            className="max-w-6xl mx-auto p-6 text-slate-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold mb-6 text-center text-rose-500">🗨️ Comments Overview</h1>
            <p className="text-center text-slate-400 mb-8 max-w-2xl mx-auto">
                Explore what people are saying on this post. You can also report comments with valid reasons.
            </p>

            <div className="overflow-x-auto bg-slate-800 shadow-lg rounded-xl">
                <table className="w-full table-auto">
                    <thead className="bg-slate-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-rose-300">Email</th>
                            <th className="px-4 py-3 text-left text-rose-300">Comment</th>
                            <th className="px-4 py-3 text-left text-rose-300">Feedback</th>
                            <th className="px-4 py-3 text-left text-rose-300">Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedComments.map((comment) => (
                            <motion.tr
                                key={comment._id}
                                className="border-b border-slate-600 hover:bg-slate-700"
                                whileHover={{ scale: 1.01 }}
                            >
                                <td className="px-4 py-2 align-top break-words max-w-xs">{comment.authorEmail}</td>
                                <td className="px-4 py-2 align-top break-words max-w-lg">{comment.text}</td>
                                <td className="px-4 py-2 align-top">
                                    <select
                                        className="bg-slate-700 text-white rounded px-2 py-1 w-full"
                                        value={feedbacks[comment._id] || ''}
                                        onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                                    >
                                        <option value="">Select feedback</option>
                                        {feedbackOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-4 py-2 align-top">
                                    <button
                                        className={`px-3 py-1 rounded font-medium transition-all ${comment?.reported
                                            ? 'bg-slate-500 cursor-not-allowed'
                                            : 'bg-rose-600 hover:bg-rose-700'
                                            } text-white`}
                                        disabled={!feedbacks[comment._id] || comment?.reported}
                                        onClick={() => handleReport(comment._id)}
                                    >
                                        {comment?.reported ? 'Reported' : 'Report'}
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {
                totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="px-3 py-1 rounded-md bg-slate-600 text-slate-300 hover:bg-sky-500 transition-all"
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                            const page =
                                totalPages > 5 && currentPage > 3
                                    ? Math.min(currentPage - 2 + index, totalPages - 4 + index)
                                    : index + 1;

                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-sky-600 text-white' : 'bg-slate-600 text-slate-300'} hover:bg-sky-500 transition-all`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="px-3 py-1 rounded-md bg-slate-600 text-slate-300 hover:bg-sky-500 transition-all"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )
            }

            {!user && (
                <p className="mt-6 text-center text-slate-400 italic">🔒 Login to report comments.</p>
            )}
        </motion.div>
    );
};

export default Comments;