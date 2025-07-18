// PostDetails.jsx
import { useState } from 'react';
import {  useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon } from 'react-share';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/shared/LoadinSpinner';


export default function PostDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState('');

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/post/${id}`
    : '';

  // Fetch post details
  const { data: post, isLoading } = useQuery({
    queryKey: ['postDetails', id],
    queryFn: async () => {
      console.log(id)
      const res = await axiosPublic.get(`/post/${id}`);
      return res.data;
    },
  });

  // Fetch comments
  const { data: { comments } = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${id}`);
      return res.data
    },
  });
  // Post a comment
  const commentMutation = useMutation({
    mutationFn: comment => axiosSecure.post('/comments', comment),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', id]);
      setCommentText('');
      toast.success("Comment has successfully submitted")
    },
  });

  // Up/down vote
  const voteMutation = useMutation({
    mutationFn: async ({ type }) => {
      const res = await axiosSecure.put(`/post/vote/${id}`, { type });
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['postDetails', id]);
    },
  });

  const handleComment = () => {
    if (!user) return toast.error('Please login to comment');
    if (!commentText.trim()) return;

    commentMutation.mutate({
      postId: id,
      authorEmail: user.email,
      authorImage: user.photoURL,
      authorName: user.displayName,
      text: commentText,
      time: new Date().toISOString(),
    });
  };

  const handleVote = type => {
    if (!user) return toast.error('Please login to vote');
    voteMutation.mutate({ type });
  };



  if (isLoading || commentsLoading || !post) {
    return <LoadingSpinner />
  };

  const emailSubject = `Check out this post: ${post.title}`;
  const emailBody = `Hey,\n\nI thought you might like this:\n\n${post.title}\n${shareUrl}\n\nEnjoy!`;


  return (
    <motion.div
      className=" bg-gray- text-gray-100 p-4 md:p-8 lg:p-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Post Header */}
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4">
            <img
              src={post.authorImage}
              alt={post.authorName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-lg">{post.authorName}</p>
              <p className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <motion.h1
            className="mt-6 text-3xl md:text-4xl font-extrabold"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {post.title}
          </motion.h1>

          {post.image && (
            <motion.div
              className="mt-6 w-full h-64 md:h-96 overflow-hidden rounded-xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover filter brightness-75"
              />
            </motion.div>
          )}

          <motion.p
            className="mt-4 text-gray-200 prose prose-invert lg:prose-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {post.description}
          </motion.p>

          {/* Tags & Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-between">
            <span className="text-sm font-medium text-indigo-400">
              #{post.tag?.value || post?.tag}
            </span>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleVote('up')}
                className="flex items-center space-x-1 text-green-400 hover:text-green-300"
              >
                <FaArrowUp />
                <span>{post.upVote}</span>
              </button>
              <button
                onClick={() => handleVote('down')}
                className="flex items-center space-x-1 text-red-400 hover:text-red-300"
              >
                <FaArrowDown />
                <span>{post.downVote}</span>
              </button>
              <div className='flex gap-2'>
                <FacebookShareButton url={shareUrl}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <EmailShareButton url={shareUrl}
                  subject={emailSubject}
                  body={emailBody}
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>

              </div>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Comments</h2>

          {user ? (
            <div className="mb-6">
              <textarea
                className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-100 placeholder-gray-500"
                rows={4}
                placeholder="Write your comment..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
              />
              <button
                onClick={handleComment}
                className="mt-3 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-md shadow-md"
              >
                Post Comment
              </button>
            </div>
          ) : (
            <p className="text-gray-400">You need to log in to comment.</p>
          )}

          <div className="space-y-4">
            {comments.map((cmt, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-900 p-4 rounded-lg border border-gray-700"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={cmt.authorImage}
                    alt={cmt.authorName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-100 text-sm">
                      {cmt.authorName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(cmt.time).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-200 text-sm">{cmt.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


