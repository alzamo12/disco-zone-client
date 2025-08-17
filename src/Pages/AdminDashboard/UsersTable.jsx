import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { motion, AnimatePresence } from 'framer-motion';
import WhiteSpinner from '../../components/shared/WhiteSpinner';

const UsersTable = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const MySwal = withReactContent(Swal);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: usersData, isLoading, refetch } = useQuery({
    queryKey: ['user', searchTerm, page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?search=${searchTerm}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleMakeAdmin = async (userId, userName) => {
    const result = await MySwal.fire({
      title: `<span class="text-xl font-semibold">Promote <span class="text-blue-400">${userName}</span>?</span>`,
      html: `<p class="text-sm text-gray-300">This will grant full <strong>admin</strong> rights.</p>`,
      icon: 'question',
      background: '#1f1f1f',
      color: '#eee',
      showCancelButton: true,
      confirmButtonText: 'Yes, promote!',
      cancelButtonText: 'No, keep user',
      customClass: {
        popup: 'p-6 rounded-2xl shadow-lg',
        confirmButton: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 btn mr-1',
        cancelButton: 'bg-gray-700 hover:bg-gray-600 btn',
      },
      buttonsStyling: false,
      showClass: { popup: 'animate__animated animate__zoomIn' },
      hideClass: { popup: 'animate__animated animate__zoomOut' },
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/user/admin/${userId}`, { role: 'admin' });
      if (res.data.modifiedCount > 0) {
        toast.success('User has become admin successfully');
        refetch();
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.search.value);
    setPage(1);
  };

  if (isLoading) return <WhiteSpinner />;

  const { users = [], usersCount = 0 } = usersData;
  const totalPage = Math.ceil(usersCount / limit);

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 space-y-8">
      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <input
          type="text"
          name="search"
          placeholder="Search by name or email"
          className="flex-1 p-2 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 btn-outline border cursor-pointer border-accent hover:bg-accent rounded-lg text-white font-medium transition"
        >
          Search
        </motion.button>
      </form>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto bg-secondary rounded-2xl shadow-lg"
      >
        <table className="min-w-full text-white">
          <thead className="bg-gray-800">
            <tr>
              {['User Name', 'User Email', 'Make Admin', 'Subscription'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left uppercase text-sm font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users.length ? (
                users.map((user) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      {user.role !== 'admin' ? (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleMakeAdmin(user._id, user.name)}
                          className="px-3 py-1 bg-accent rounded-md text-sm font-medium"
                        >
                          Make Admin
                        </motion.button>
                      ) : (
                        <span className="px-3 py-1 bg-outline border-accent border rounded-md text-sm">
                          Admin
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-md text-sm  ${
                          user.badge === 'gold' ? 'text-accent border border-accent' : 'border border-base-200 text-accent'
                        }`}
                      >
                        {user.badge === 'gold' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 cursor-pointer bg-gray-700 disabled:opacity-50 text-white rounded-md transition"
        >
          Previous
        </motion.button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPage }, (_, i) => (
            <motion.button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`px-3 py-1 cursor-pointer rounded-full text-sm font-medium transition ${
                page === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {i + 1}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
          disabled={page === totalPage}
          className="px-4 py-2 cursor-pointer bg-gray-700 disabled:opacity-50 text-white rounded-md transition"
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default UsersTable;
