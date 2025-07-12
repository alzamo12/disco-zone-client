// PostDetails.jsx
import  { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PostDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const shareUrl = `${window.location.origin}/post/${id}`;

  const { data: post, isLoading } = useQuery({
    queryKey: ['postDetails', id],
    queryFn: () => axiosSecure.get(`/post/${id}`).then(res => res.data),
  });

  const commentMutation = useMutation({
    mutationFn: async (comment) => {
      return axiosSecure.post('/comments', comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      setCommentText('');
    },
  });

  const voteMutation = useMutation({
    mutationFn: ({ type }) => axiosSecure.put(`/post/vote/${id}`, { type }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postDetails', id] }),
  });

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => axiosSecure.get(`/comments/${id}`).then(res => res.data),
  });

  if (isLoading) return <p className="text-center py-10">Loading post...</p>;

  const handleComment = () => {
    if (user && commentText.trim()) {
      commentMutation.mutate({
        postId: id,
        authorEmail: user.email,
        authorImage: user.photoURL,
        authorName: user.displayName,
        text: commentText,
        time: new Date(),
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow p-6 rounded-lg">
        <div className="flex items-center space-x-4 mb-4">
          <img src={post.authorImage} className="w-12 h-12 rounded-full" alt="author" />
          <div>
            <p className="font-semibold">{post.authorName}</p>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.description}</p>

        <p className="text-sm font-medium text-indigo-600 mb-2">Tag: #{post?.tag?.value}</p>

        <div className="flex items-center space-x-6 mt-4">
          <button
            onClick={() => voteMutation.mutate({ type: 'up' })}
            className="flex items-center space-x-1 text-green-600 hover:text-green-800"
          >
            <FaArrowUp /> <span>{post.upVote}</span>
          </button>
          <button
            onClick={() => voteMutation.mutate({ type: 'down' })}
            className="flex items-center space-x-1 text-red-600 hover:text-red-800"
          >
            <FaArrowDown /> <span>{post.downVote}</span>
          </button>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {user ? (
          <div className="mb-4">
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              rows="3"
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button
              onClick={handleComment}
              className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Comment
            </button>
          </div>
        ) : (
          <p className="text-gray-500">You need to log in to comment.</p>
        )}

        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-md">
              <div className="flex items-center space-x-2 mb-1">
                <img src={comment.authorImage} alt="avatar" className="w-8 h-8 rounded-full" />
                <span className="font-medium text-sm">{comment.authorName}</span>
                <span className="text-xs text-gray-500 ml-auto">{new Date(comment.time).toLocaleString()}</span>
              </div>
              <p className="text-gray-800 text-sm">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails
