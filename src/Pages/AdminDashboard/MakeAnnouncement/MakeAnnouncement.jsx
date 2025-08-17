import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { showAnnouncementSuccess } from '../../../utils/showAnnouncementSuccess';
import { motion } from 'framer-motion';

const MakeAnnouncement = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            authorImage: user?.photoURL || '',
            authorName: user?.displayName || ''
        }
    });

    const mutation = useMutation({
        mutationFn: (data) => axiosSecure.post('/announcement', data).then(res => res.data),
        onSuccess: (_, variables) => {
            reset();
            showAnnouncementSuccess(variables.title);
        }
    });

    const onSubmit = data => {
        mutation.mutate(data);
    };

    return (
        <div className="flex justify-center items-start my-12 px-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-5xl bg-secondary rounded-2xl shadow-xl p-4 lg:p-8"
            >
                <h2 className="text-3xl font-semibold text-center text-white mb-6">
                    Make Announcement
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {[
                        { label: 'Author Image', name: 'authorImage', readOnly: true, bg: 'bg-gray-800' },
                        { label: 'Author Name', name: 'authorName', readOnly: true, bg: 'bg-gray-800' },
                        { label: 'Title', name: 'title', readOnly: false, bg: 'bg-gray-700' },
                    ].map(field => (
                        <div key={field.name}>
                            <label className="block mb-2 text-gray-300">{field.label}</label>
                            <input
                                type="text"
                                readOnly={field.readOnly}
                                {...register(field.name, { required: `${field.label} is required` })}
                                className={`${field.bg} w-full p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                            />
                            {errors[field.name] && (
                                <p className="mt-1 text-sm text-red-500">{errors[field.name].message}</p>
                            )}
                        </div>
                    ))}

                    <div>
                        <label className="block mb-2 text-gray-300">Description</label>
                        <textarea
                            rows={5}
                            {...register('description', { required: 'Description is required' })}
                            className="bg-gray-700 w-full p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        disabled={mutation.isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-accent rounded-full text-white font-semibold disabled:opacity-50 transition"
                    >
                        {mutation.isLoading ? 'Posting...' : 'Post Announcement'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default MakeAnnouncement;
