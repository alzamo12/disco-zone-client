import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaTrash, FaComments } from 'react-icons/fa';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from 'react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhiteSpinner from '../../../components/shared/WhiteSpinner';

const MyPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch paginated posts
  const { data: posts = [], isLoading, isFetching } = useQuery({
    queryKey: ['userPosts', user.email, page],
    keepPreviousData: true,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/posts/${user.email}?sort=-createdAt&page=${page}&limit=${limit}`
      );
      return res.data;
    }
  });

  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn: id => axiosSecure.delete(`/post/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPosts', user.email] });
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Post deleted',
        showConfirmButton: false,
        timer: 1500,
        background: '#1f1f1f',
        color: '#fff'
      });
    }
  });

  if (isLoading) return <WhiteSpinner />;

  return (
    <div className="w-screen md:max-w-5xl mx-auto my-12 md:px-4 lg:px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-center text-white mb-6"
      >
        My Posts
      </motion.h2>

      <div className="bg-secondary rounded-2xl shadow-2xl overflow-hidden min-w-full">
        <table className="min-w-full lg:w-1/3 xl:min-w-full text-white">
          <thead className="bg-gray-800">
            <tr>
              {['Title', 'Votes', 'Comments', 'Actions'].map(col => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {posts.length > 0 ? (
                posts.map(post => (
                  <motion.tr
                    key={post._id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="px-4 py-3">{post.title}</td>
                    <td className="px-4 py-3">{post.upVote - post.downVote}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/comments/${post._id}`}
                        className="inline-flex items-center text-accent hover:underline"
                      >
                        <FaComments className="mr-1" /> Comment
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          Swal.fire({
                            title: 'Delete this post?',
                            text: post.title,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes, delete it',
                            background: '#1f1f1f',
                            color: '#fff'
                          }).then(result => {
                            if (result.isConfirmed) deleteMutation.mutate(post._id);
                          })
                        }
                        className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-full text-sm font-medium text-white"
                      >
                        <FaTrash className="mr-1" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    You have not created any posts yet.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-6">
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1 || isFetching}
          className="px-4 py-2 bg-gray-700 rounded-full disabled:opacity-50 text-white"
        >
          Previous
        </motion.button>

        <span className="text-white">
          Page <strong>{page}</strong>
          {isFetching && <em className="ml-2 text-sm text-gray-400">(Loading…)</em>}
        </span>

        <motion.button
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => posts.length === limit && setPage(p => p + 1)}
          disabled={posts.length < limit || isFetching}
          className="px-4 py-2 bg-gray-700 rounded-full disabled:opacity-50 text-white"
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default MyPosts;
