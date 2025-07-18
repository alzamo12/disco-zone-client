import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion, AnimatePresence } from 'framer-motion';
import WhiteSpinner from '../../../components/shared/WhiteSpinner';

const MyProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    // Fetch profile data
    const { data: profile, isLoading: loadingProfile } = useQuery({
        queryKey: ['profile', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${email}`);
            console.log(res.data)
            return res.data
        },
    });

    // Fetch recent posts
    const { data: posts = [], isLoading: loadingPosts } = useQuery({
        queryKey: ['recentPosts', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts?email=${email}&sort=-createdAt&limit=3`);
            return res.data
        }
    });

    if (loadingProfile || loadingPosts) {
        return <WhiteSpinner />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center py-12 bg-gray-900 min-h-screen mx-2"
        >
            <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-8">
                {/* Profile Header */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 space-x-2 md:space-x-4"
                >
                    <img
                        src={user?.photoURL}
                        alt="avatar"
                        className="h-20 w-20 rounded-full object-cover border-4 border-indigo-600"
                    />
                    <div className='text-center'>
                        <h1 className="text-3xl font-bold text-white">{user?.displayName}</h1>
                        <p className="text-gray-400">{email}</p>
                    </div>
                    <div className="mx-auto ">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${profile?.badge === 'gold'
                                ? 'bg-yellow-500 text-gray-900'
                                : 'bg-amber-700 text-white'
                                }`}
                        >
                            {profile?.badge === 'gold' ? 'Gold' : 'Bronze'}
                        </span>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    {[
                        { label: 'Posts', value: profile?.postsCount },
                        { label: 'Comments', value: profile?.commentsCount },
                        // { label: 'Users', value: profile?.usersCount },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-gray-700 rounded-lg p-4 text-center motion-safe:transform motion-safe:hover:scale-105 transition"
                        >
                            <p className="text-xl font-bold text-indigo-300">{stat.value}</p>
                            <p className="text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Recent Posts */}
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-4">Recent Posts</h2>
                    <div className="space-y-4">
                        <AnimatePresence>
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <motion.div
                                        key={post._id}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-gray-700 rounded-lg p-4 shadow-lg hover:shadow-xl transition"
                                    >
                                        <h3 className="text-lg font-bold text-white">{post.title}</h3>
                                        <p className="text-gray-400 truncate">{post.description}</p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </p>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-gray-400">No recent posts.</p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MyProfile;
