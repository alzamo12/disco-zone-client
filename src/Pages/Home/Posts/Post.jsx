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

    const description = post?.description;
    const cutDescription = description.slice(0, 50);

    return (
        <motion.div
            key={post._id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="py-6 px-3 sm:py-5 sm:p-5 bg-primary border border-slate-700 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-300 h-60 md:h-48"
        >
            <div className='mb-3'>
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
                <div className='text-gray-400'>
                    {description.length > 50 ? <span>{cutDescription}... ...</span> : description}
                </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full justify-between">
                <span className="btn-outline border-accent text-white px-2 py-1 text-xs rounded-md border flex items-center">
                    #{post?.tag?.value || post?.tag}
                </span>
                <div>
                    <button
                        onClick={() => handlePostClick(post._id)}
                        className=' btn shadow-none btn-outline border-accent text-white hover:bg-primary flex-end justify-self-end'>see more</button>
                </div>
            </div>
        </motion.div>
    );
};

export default Post;