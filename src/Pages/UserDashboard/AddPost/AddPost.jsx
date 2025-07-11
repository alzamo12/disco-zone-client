import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Select from 'react-select';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../components/shared/LoadinSpinner';


export default function AddPost() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    // 1️⃣ fetch post count using object syntax
    const { data: count = 0, isLoading } = useQuery({
        queryKey: ['postCount', user?.email],
        queryFn: () => axiosSecure.get(`/posts/count/${user.email}`).then(res => res.data.count),
    });

    // 2️⃣ mutation to add post using object syntax
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
                timerProgressBar: true,
                background: '#f0f9ff',
                iconColor: '#2f855a'
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

    if (isLoading) return <LoadingSpinner />;

    if (count >= 5) {
        return (
            <div className="text-center py-16">
                <p className="text-xl mb-4">You've reached the limit of 5 posts.</p>
                <button
                    onClick={() => window.location = '/membership'}
                    className="btn btn-primary"
                >Become a Member</button>
            </div>
        );
    }

    const onSubmit = data => {
        if (count >= 5) {
            Swal.fire({
                icon: 'warning',
                title: 'Post Limit Reached',
                text: 'You have reached the maximum of 5 posts. Consider becoming a member for unlimited posts.',
                confirmButtonText: 'Go to Membership',
                background: '#fff',
                iconColor: '#d69e2e',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/membership';
                }
            });
        }
        else {
            mutation.mutate(data);
        }
    };

    return (
        <div className='grid place-items-center min-h-screen'>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full  mx-auto p-4 space-y-4">
                {/* Author Image URL */}
                <h2 className="card-title">Please Add your Post</h2>
                <div>
                    <label className="block text-sm font-medium">Author Image URL</label>
                    <input
                        type="url"
                        {...register('authorImage', { required: true })}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                    {errors.authorImage && <span className="text-red-500 text-sm">Required</span>}
                </div>

                {/* Author Name (read-only) */}
                <div>
                    <label className="block text-sm font-medium">Author Name</label>
                    <input
                        type="text"
                        {...register('authorName')}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Author Email (read-only) */}
                <div>
                    <label className="block text-sm font-medium">Author Email</label>
                    <input
                        type="email"
                        {...register('authorEmail')}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Post Title */}
                <div>
                    <label className="block text-sm font-medium">Post Title</label>
                    <input
                        type="text"
                        {...register('title', { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.title && <span className="text-red-500 text-sm">Required</span>}
                </div>

                {/* Post Description */}
                <div>
                    <label className="block text-sm font-medium">Post Description</label>
                    <textarea
                        {...register('description', { required: true })}
                        className="textarea textarea-bordered w-full"
                        rows={4}
                    />
                    {errors.description && <span className="text-red-500 text-sm">Required</span>}
                </div>

                {/* Tag Dropdown */}
                <div>
                    <label className="block text-sm font-medium">Tag</label>
                    <Controller
                        control={control}
                        name="tag"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={[
                                    { value: 'JavaScript', label: 'JavaScript' },
                                    { value: 'React', label: 'React' },
                                    // ...other tags
                                ]}
                                placeholder="Select a tag"
                            />
                        )}
                    />
                    {errors.tag && <span className="text-red-500 text-sm">Required</span>}
                </div>

                {/* Hidden votes fields */}
                <input type="hidden" {...register('upVote')} />
                <input type="hidden" {...register('downVote')} />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-neutral w-full"
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? 'Adding...' : 'Add Post'}
                </button>
            </form>
        </div>
    );
}