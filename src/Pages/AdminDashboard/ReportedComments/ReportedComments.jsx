import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showReportSuccess } from '../../../utils/alerts/ShowRepotSuccess';
import LoadingSpinner from '../../../components/shared/LoadinSpinner';
import { useState } from 'react';

const ReportedComments = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const limit = 2;

    const { data: commentsData, isLoading } = useQuery({
        queryKey: ['reportedComment', limit, page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reported-comments?limit=${limit}&page=${page}`);
            return res.data
        }
    });

    // Mutation to delete comment
    const deleteMutation = useMutation(
        {
            mutationFn: async (id) => {
                const res = await axiosSecure.delete(`/comment/${id}`);
                return res.data
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['reportedComment']);
                showReportSuccess();
            }
        }
    );

    // Mutation to dismiss report
    const dismissMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.put(`/comment/dismiss-report/${id}`);
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['reportedComment']);
            showReportSuccess();
        }
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const { comments, commentsCount } = commentsData;
    const totalPage = Math.ceil(commentsCount / limit);
    console.log(comments)
    return (
        <div className="w-3/4 mx-auto bg-gray-900 text-white p-4 lg:p-8">
            <h1 className="text-2xl font-semibold mb-6">Reported Activities</h1>
            <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">Commenter</th>
                            <th className="px-4 py-2 text-left">Comment</th>
                            <th className="px-4 py-2 text-left">Feedback</th>
                            <th className="px-4 py-2 text-center">Date Reported</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {comments?.map(report => (
                            <tr key={report._id} className="hover:bg-gray-700">
                                <td className="px-4 py-3">{report.authorEmail}</td>
                                <td className="px-4 py-3">{report.text}</td>
                                <td className="px-4 py-3 max-w-xs truncate">{report.feedback}</td>
                                <td className="px-4 py-3 text-center">
                                    {new Date(report.reportedAt).toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-center space-x-2">
                                    <button
                                        onClick={() => deleteMutation.mutate(report._id)}
                                        disabled={deleteMutation.isLoading}
                                        className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => dismissMutation.mutate(report._id)}
                                        disabled={dismissMutation.isLoading}
                                        className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-sm"
                                    >
                                        Dismiss
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {comments?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-6 text-center text-gray-400">
                                    No reported comments.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* Pagination controls */}
                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="btn btn-sm"
                    >Previous</button>
                    <span>Page {page} out of {totalPage}</span>
                    <button
                        onClick={() => {
                            setPage(prev => prev + 1);
                        }}
                        disabled={page === totalPage}
                        className="btn btn-sm"
                    >Next</button>
                </div>
            </div>
        </div>
    );
};

export default ReportedComments;