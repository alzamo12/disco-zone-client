import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { showReportSuccess } from '../../../utils/alerts/ShowRepotSuccess';
import LoadingSpinner from '../../../components/shared/LoadinSpinner';

const ReportedComments = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = new QueryClient();
    const { data: comments, isLoading } = useQuery({
        queryKey: ['reportedComment'],
        queryFn: async () => {
            const res = await axiosSecure.get("/reported-comments");
            console.log(res.data)
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
            </div>
        </div>
    );
};

export default ReportedComments;