import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/shared/LoadinSpinner';

const MyProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    // 1️⃣ Fetch profile data
    const { data: profile, isLoading: loadingProfile } = useQuery({
        queryKey: ['profile', email],
        queryFn: () =>
            axiosSecure.get(`/user/${email}`).then(res => res.data),
    });

    // 2️⃣ Fetch recent posts
    const { data: posts = [], isLoading: loadingPosts } = useQuery({
        queryKey: ['recentPosts', email],
        queryFn: () =>
            axiosSecure
                .get(`/posts?email=${user?.email}&sort=-createdAt&limit=${3} `)
                .then(res => res.data),
    });

    if (loadingProfile || loadingPosts) {
        return <LoadingSpinner />;
    }

    return (
        <div className='md:grid md:place-items-center h-full'>
            <section className="max-w-4xl lg:w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                {/* Profile header */}
                <div className="flex items-center space-x-4 mb-6">
                    <img
                        src={profile?.image}
                        alt="avatar"
                        className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                        <h1 className="text-2xl font-bold">{profile?.name}</h1>
                        <p className="text-gray-500">{profile?.email}</p>
                    </div>
                    {/* Badge icon */}
                    <div className="ml-auto">
                        {profile?.badge === 'gold' ? (
                            <div className="badge badge-warning font-bold">Gold</div>

                        ) : (
                            <div className="badge badge-warning bg-amber-600 text-white font-bold">Bronze</div>
                        )}
                    </div>
                </div>

                {/* Recent posts */}
                {posts?.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Your Recent Posts</h2>
                        <ul className="space-y-4">
                            {posts?.map(post => (
                                <li
                                    key={post?._id}
                                    className="p-4 border rounded-lg hover:shadow-md transition"
                                >
                                    <h3 className="font-bold">{post?.title}</h3>
                                    <p className="text-gray-600 text-sm truncate">
                                        {post?.description}
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {new Date(post?.createdAt).toLocaleDateString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        </div>
    );
};

export default MyProfile