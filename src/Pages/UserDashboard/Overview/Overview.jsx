"use client";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

// Example data (replace with API/user data)
const commentData = [
    { date: "Jan", comments: 12 },
    { date: "Feb", comments: 18 },
    { date: "Mar", comments: 25 },
    { date: "Apr", comments: 15 },
    { date: "May", comments: 30 },
];

const postData = [
    { date: "Jan", posts: 3 },
    { date: "Feb", posts: 6 },
    { date: "Mar", posts: 4 },
    { date: "Apr", posts: 7 },
    { date: "May", posts: 5 },
];

const Overview = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: { postData, commentData } = {} } = useQuery({
        queryKey: ['post-comment', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/overview/${user?.email}`);
            console.log(res.data)
            return res.data
        }
    })

    return (
        <section className="bg-primary max-w-5xl mx-auto text-white py-16 min-h-screen">
            <div className="mx-auto space-y-12">

                {/* Page Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-sky-500 text-center"
                >
                    User Overview
                </motion.h2>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Comments Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-base-200 border border-slate-700 rounded-xl p-6 shadow-md"
                    >
                        <h3 className="text-xl font-semibold text-sky-400 mb-4">
                            Comments Over Time
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={commentData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="date" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
                                <Line type="monotone" dataKey="comments" stroke="#38bdf8" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Posts Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-md"
                    >
                        <h3 className="text-xl font-semibold text-sky-400 mb-4">
                            Posts Over Time
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={postData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="date" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
                                <Bar dataKey="posts" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Overview
