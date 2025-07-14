import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { showAnnouncementSuccess } from '../../../utils/showAnnouncementSuccess';

const MakeAnnouncement = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            authorImage: user?.photoURL,
            authorName: user?.displayName
        }
    });

    // Mutation to post new announcement
    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post("/announcement", data);
            return res.data
        },
        onSuccess: (data, variables) => {
            reset()
            showAnnouncementSuccess(variables?.title)
        }
    }
    );

    const onSubmit = (data) => {
        // const date = new 
        mutation.mutate(data);
    };

    return (
        <div className=" text-white flex justify-center items-start p-4">
            <div className="w-full lg:w-3/4 xl:w-full max-w-2xl bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Make Announcement</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Author Image */}
                    <div>
                        <label className="block mb-1">Author Image</label>
                        <input
                            type="text"
                            readOnly
                            {...register('authorImage', { required: 'Image is required' })}
                            className="w-full p-2 bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.authorImage && <p className="text-red-500 mt-1">{errors.authorImage.message}</p>}
                    </div>

                    {/* Author Name */}
                    <div>
                        <label className="block mb-1">Author Name</label>
                        <input
                            type="text"
                            readOnly
                            {...register('authorName', { required: 'Name is required' })}
                            className="w-full p-2 bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.authorName && <p className="text-red-500 mt-1">{errors.authorName.message}</p>}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block mb-1">Title</label>
                        <input
                            type="text"
                            {...register('title', { required: 'Title is required' })}
                            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1">Description</label>
                        <textarea
                            rows={4}
                            {...register('description', { required: 'Description is required' })}
                            className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium disabled:opacity-50"
                    >
                        {mutation.isLoading ? 'Posting...' : 'Post Announcement'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MakeAnnouncement;