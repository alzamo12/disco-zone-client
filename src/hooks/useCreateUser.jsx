import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosPublic from './useAxiosPublic';

const useCreateUser = ({ from = "/" }) => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async ({ userData }) => {
            const res = await axiosPublic.post('/user', userData);
            return res;
        },
        onSuccess: (res, variables) => {
            if (res.data.insertedId) {
                toast.dismiss(variables.toastId)
                navigate(from)
                Swal.fire({
                    title: "You have Signed Up successfully",
                    icon: "success",
                    draggable: true
                });
            } else {
                navigate(from)
                Swal.fire({
                    title: "You have Signed In successfully",
                    icon: "success",
                    draggable: true
                });
            }
        },
        onError: (err) => {
            console.log(err)
        }
    });

    return mutation;
};

export default useCreateUser;
