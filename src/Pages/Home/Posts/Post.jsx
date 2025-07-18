import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Post = ({ post, handlePostClick }) => {
    const axiosPublic = useAxiosPublic();
    const { data: commentsCount } = useQuery({
        queryKey: ['commentsCount', post._id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/comments-count?id=${post._id}`);
            return res.data.commentsCount
        }
    });

    return (
        <motion.div
            key={post._id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200 }}
            onClick={() => handlePostClick(post._id)}
            className="p-5 bg-slate-800 border border-slate-700 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-300"
        >
            <div className="flex items-center gap-3 mb-3">
                <img
                    src={post.authorImage}
                    alt={post.authorName}
                    className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-xl font-semibold text-white">{post.title}</h2>
                    <p className="text-sm text-slate-400">
                        {new Date(post.createdAt).toLocaleString()} • {commentsCount} comments • {post.upVote - post.downVote} votes
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                <span className="bg-sky-700/20 text-sky-300 px-2 py-1 text-xs rounded-md border border-sky-500">
                    #{post?.tag?.value || post?.tag}
                </span>
            </div>
        </motion.div>
    );
};

export default Post;