import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Select from 'react-select';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import WhiteSpinner from '../../../components/shared/WhiteSpinner';
import useUserRole from "../../../hooks/useUserRole"
export default function AddPost() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const { badge } = useUserRole()

    const { data: count = 0, isLoading } = useQuery({
        queryKey: ['postCount', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/count/${user?.email}`);
            return res.data.count
        }
    });
    const { data: tags, isLoading: tagsLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            const res = await axiosPublic.get("/tags");
            return res.data
        }
    })

    const mutation = useMutation({
        mutationFn: postData => axiosSecure.post('/posts', postData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['postCount', user?.email] });
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Post added successfully',
                showConfirmButton: false,
                timer: 2000,
                background: '#1f1f1f',
                color: '#fff'
            });
        },
    });

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            authorImage: user?.photoURL || '',
            authorName: user?.displayName || '',
            authorEmail: user?.email,
            title: '',
            description: '',
            tag: null,
            upVote: 0,
            downVote: 0,
        }
    });

    if (isLoading || tagsLoading) return <WhiteSpinner />;

    if (count >= 5 && badge !== 'gold') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gray-800 p-8 rounded-2xl shadow-xl text-center max-w-md"
                >
                    <h2 className="text-2xl mb-4">Post Limit Reached</h2>
                    <p className="mb-6">You’ve reached the limit of 5 posts.</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/membership'}
                        className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-semibold"
                    >
                        Become a Member
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    const onSubmit = data => {
        const { tag, ...rest } = data;
        mutation.mutate({ ...rest, tag: tag?.value });
    };

    return (
        <div className="flex justify-center py-12 max-w-5xl mx-auto px-4 bg- min-h-screen">
            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-secondary p-8 rounded-2xl shadow-2xl space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-white">
                    Create New Post
                </h2>

                {[
                    { label: 'Author Image URL', name: 'authorImage', readOnly: true },
                    { label: 'Author Name', name: 'authorName', readOnly: true },
                    { label: 'Author Email', name: 'authorEmail', readOnly: true },
                    { label: 'Title', name: 'title', readOnly: false },
                ].map(field => (
                    <div key={field.name}>
                        <label className="block mb-2 text-gray-300">{field.label}</label>
                        <motion.input
                            type={field.name === 'authorEmail' ? 'email' : 'text'}
                            readOnly={field.readOnly}
                            {...register(field.name, { required: !field.readOnly })}
                            whileFocus={{ scale: 1.02 }}
                            className={`w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${errors[field.name] ? 'border-red-500 border' : ''
                                }`}
                        />
                        {errors[field.name] && (
                            <p className="mt-1 text-sm text-red-500">{field.label} is required</p>
                        )}
                    </div>
                ))}

                <div>
                    <label className="block mb-2 text-gray-300">Description</label>
                    <motion.textarea
                        rows={5}
                        {...register('description', { required: true })}
                        whileFocus={{ scale: 1.02 }}
                        className={`w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${errors.description ? 'border-red-500 border' : ''
                            }`}
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-500">Description is required</p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 text-gray-300">Tag</label>
                    <Controller
                        control={control}
                        name="tag"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <motion.div whileHover={{ scale: 1.02 }}>
                                <Select
                                    {...field}
                                    options={tags.map(tag => ({
                                        value: tag?.tag,
                                        label: tag?.tag
                                    }))}
                                    placeholder="Select a tag"
                                    theme={theme => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#4c51bf20',
                                            primary: '#7f9cf520',
                                            neutral0: '#2d3748',
                                            neutral80: '#e2e8f0'
                                        }
                                    })}
                                />
                            </motion.div>
                        )}
                    />
                    {errors.tag && (
                        <p className="mt-1 text-sm text-red-500">Tag is required</p>
                    )}
                </div>

                <input type="hidden" {...register('upVote')} />
                <input type="hidden" {...register('downVote')} />

                <motion.button
                    type="submit"
                    disabled={mutation.isLoading}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 btn-outline border border-accent rounded-full text-white font-semibold disabled:opacity-50 transition"
                >
                    {mutation.isLoading ? 'Adding...' : 'Add Post'}
                </motion.button>
            </motion.form>
        </div>
    );
}
