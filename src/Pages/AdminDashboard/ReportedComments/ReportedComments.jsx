import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showReportSuccess } from '../../../utils/alerts/ShowRepotSuccess';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhiteSpinner from '../../../components/shared/WhiteSpinner';

const ReportedComments = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: commentsData, isLoading } = useQuery({
        queryKey: ['reportedComment', page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reported-comments?limit=${limit}&page=${page}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/comment/${id}`).then(r => r.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['reportedComment']);
            showReportSuccess('Deleted');
        },
    });

    const dismissMutation = useMutation({
        mutationFn: (id) => axiosSecure.put(`/comment/dismiss-report/${id}`).then(r => r.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['reportedComment']);
            showReportSuccess('Dismissed');
        },
    });

    if (isLoading) return <WhiteSpinner />;

    const { comments = [], commentsCount = 0 } = commentsData;
    const totalPages = Math.ceil(commentsCount / limit);

    return (
        <div className="max-w-5xl mx-auto my-12 p-4 lg:p-8 bg-gray-900 rounded-2xl shadow-2xl text-white">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-bold text-center mb-6 border-b pb-2 border-gray-700"
            >
                Reported Activities
            </motion.h1>

            <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-inner">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            {['Commenter', 'Comment', 'Feedback', 'Date Reported', 'Actions'].map(header => (
                                <th
                                    key={header}
                                    className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        <AnimatePresence>
                            {comments.length > 0 ? (
                                comments.map((rep) => (
                                    <motion.tr
                                        key={rep._id}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 30 }}
                                        transition={{ duration: 0.2 }}
                                        className="hover:bg-gray-700"
                                    >
                                        <td className="px-4 py-3">{rep.authorEmail}</td>
                                        <td className="px-4 py-3">{rep.text}</td>
                                        <td className="px-4 py-3 max-w-xs truncate">{rep.feedback}</td>
                                        <td className="px-4 py-3 text-center whitespace-nowrap">
                                            {new Date(rep.reportedAt).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-center flex gap-2 space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => deleteMutation.mutate(rep._id)}
                                                disabled={deleteMutation.isLoading}
                                                className="px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-md text-sm font-medium disabled:opacity-50"
                                            >
                                                Delete
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => dismissMutation.mutate(rep._id)}
                                                disabled={dismissMutation.isLoading}
                                                className="px-3 py-1 bg-gradient-to-r from-green-600 to-teal-500 rounded-md text-sm font-medium disabled:opacity-50"
                                            >
                                                Dismiss
                                            </motion.button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-gray-800"
                                >
                                    <td colSpan={5} className="py-6 text-center text-gray-400">
                                        No reported comments.
                                    </td>
                                </motion.tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-6">
                <motion.button
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-700 rounded-full disabled:opacity-50"
                >
                    Previous
                </motion.button>

                <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <motion.button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-3 py-1 rounded-full text-sm font-semibold transition ${page === i + 1
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                        >
                            {i + 1}
                        </motion.button>
                    ))}
                </div>

                <motion.button
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-700 rounded-full disabled:opacity-50"
                >
                    Next
                </motion.button>
            </div>
        </div>
    );
};

export default ReportedComments;
