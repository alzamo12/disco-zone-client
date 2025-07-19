import { useState } from 'react';
import { Outlet } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import useAuth from '../../../hooks/useAuth';
import { showReportSuccess } from '../../../utils/alerts/ShowRepotSuccess';
import WhiteSpinner from '../../../components/shared/WhiteSpinner';
const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const AdminDashboard = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [newTag, setNewTag] = useState('');
    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading } = useQuery(
        {
            queryKey: ["admin-stat"],
            queryFn: async () => {
                const res = await axiosSecure.get(`/admin-stats`);
                return res.data
            }
        }
    );

    const addTagMutation = useMutation(
        {
            mutationFn: async (tag) => {
                const res = await axiosSecure.post("/tag", { tag });
                return res.data
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(['tag']);
                setNewTag('');
                console.log(data)
                if(data?.insertedId){
                    const title = 'Tag Added Successfully';
                    const description = 'Thank you for adding a Tag and Our website running'
                    showReportSuccess(title, description)
                }
            }
        }
    );

    if (isLoading) {
        return <WhiteSpinner />
    }

    const pieData = [
        { name: 'Posts', value: stats.postsCount },
        { name: 'Comments', value: stats.commentsCount },
        { name: 'Users', value: stats.usersCount }
    ];

    return (
        <div className="flex flex-col gap-4 lg:flex-row bg-gray-900 min-h-full text-white">
            {/* Sidebar */}
            <aside className="rounded-3xl lg:rounded-none lg:block lg:w-1/4 bg-gray-800 p-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                >
                    <div className="text-center">
                        <img
                            src={user?.photoURL}
                            alt="Admin"
                            className="w-24 h-24 rounded-full mx-auto border-2 border-gray-600"
                        />
                        <h2 className="mt-2 text-xl font-semibold">{user?.displayName}</h2>
                        <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Statistics</h3>
                        <ul className="space-y-1">
                            <li>Posts: {stats?.postsCount}</li>
                            <li>Comments: {stats?.commentsCount}</li>
                            <li>Users: {stats?.usersCount}</li>
                        </ul>
                    </div>
                </motion.div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:p-6 lg:w-3/4 md:w-full sm:w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-800 p-6 rounded-2xl shadow-lg"
                >
                    <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
                    <div className="w-full h-72">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Tag Form */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-2">Add New Tag</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (newTag.trim()) addTagMutation.mutate(newTag.trim());
                            }}
                            className="flex space-x-2"
                        >
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Enter tag"
                                className="flex-1 p-2 rounded-lg bg-gray-700 placeholder-gray-400 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition"
                                disabled={addTagMutation.isLoading}
                            >
                                {addTagMutation.isLoading ? 'Adding...' : 'Add Tag'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default AdminDashboard;
