import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UsersTable = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["user", searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${searchTerm}`);
            return res.data
        }
    });



    const handleMakeAdmin = async (userId) => {
        try {
            await axiosSecure.patch(`/users/admin/${userId}`);
            refetch();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearch = e => {
        e.preventDefault();
        setSearchTerm(e.target.search.value)
        console.log(e.target.search.value)
    };

    if (isLoading) {
        return <div className="text-white p-4">Loading users...</div>;
    }

    return (
        <div className="w-full lg:w-3/4 p-4">
            <form onSubmit={handleSearch} className="mb-4 flex gap-4">
                <input
                    type="text"
                    name='search'
                    placeholder="Search by name or email"
                    className="w-full p-2 bg-gray-700 text-white placeholder-gray-400 rounded"
                />
                <input type="submit" value="Submit" className='btn btn-neutral text-white' />
            </form>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className="px-4 py-2 text-left">User Name</th>
                            <th className="px-4 py-2 text-left">User Email</th>
                            <th className="px-4 py-2 text-center">Make Admin</th>
                            <th className="px-4 py-2 text-center">Subscription Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(user => (
                            <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-700">
                                <td className="px-4 py-2">{user?.name}</td>
                                <td className="px-4 py-2">{user?.email}</td>
                                <td className="px-4 py-2 text-center">
                                    {user.role !== 'admin' ? (
                                        <button
                                            onClick={() => handleMakeAdmin(user._id)}
                                            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded"
                                        >
                                            Make Admin
                                        </button>
                                    ) : (
                                        <span className="px-3 py-1 bg-green-600 rounded">Admin</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {user?.badge === 'gold' ? (
                                        <span className="px-3 py-1 bg-green-600 rounded">Active</span>
                                    ) : (
                                        <span className="px-3 py-1 bg-red-600 rounded">Inactive</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {users.length === 0 && (
                <div className="text-gray-400 text-center mt-4">No users found.</div>
            )}
        </div>
    );
};

export default UsersTable
