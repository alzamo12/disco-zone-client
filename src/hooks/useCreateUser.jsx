import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosPublic from './useAxiosPublic';

const useCreateUser = ({ from = "/" }) => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async ({userData}) => {
            const res = await axiosPublic.post('/user', userData);
            return res
        },
        onSuccess: (res, variables) => {
            if (res.status === 201) {
                toast.dismiss(variables.toastId)
                console.log(res.data)
                navigate(from)
                Swal.fire({
                    title: "You have Signed Up successfully",
                    icon: "success",
                    draggable: true
                });
            }
        },
    });

    return mutation;
};

export default useCreateUser;
