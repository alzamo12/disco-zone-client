import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrash, FaComments } from 'react-icons/fa';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import LoadingSpinner from '../../../components/shared/LoadinSpinner';
import { Link } from 'react-router';

const MyPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 1️ Fetch all posts by user
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['userPosts', user.email],
    queryFn: () =>
      axiosSecure
        .get(`/posts?email=${encodeURIComponent(user.email)}&sort=-createdAt`)
        .then(res => res.data),
  });

  // 2️ Mutation to delete post
  const deleteMutation = useMutation({
    mutationFn: postId => axiosSecure.delete(`/post/${postId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts', user.email] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Post deleted',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleComment = (id) => {
    console.log('comment', id)
  }

  if (isLoading) return <LoadingSpinner />

  return (
      <div className="max-w-4xl lg:w-3/4 xl:w-full mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">My Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">You have not created any posts yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Votes</th>
                  <th className="px-4 py-2">Comments</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{post.title}</td>
                    <td className="px-4 py-2">{post.upVote - post.downVote}</td>
                    <td className="px-4 py-2">
                      <Link
                      to={`/comments/${post._id}`}
                        className="text-blue-500 hover:underline flex items-center"
                        onClick={() => handleComment(post._id)}
                      >
                        <FaComments className="mr-1" /> Comment
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="text-red-500 hover:text-red-700 flex items-center"
                        onClick={() => {
                          Swal.fire({
                            title: 'Delete this post?',
                            text: post.title,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes, delete it',
                          }).then(result => {
                            if (result.isConfirmed) {
                              deleteMutation.mutate(post._id);
                            }
                          });
                        }}
                      >
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
  );
};

export default MyPosts