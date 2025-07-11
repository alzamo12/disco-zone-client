import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from './useAxiosSecure';

const useCreateUser = ({ from = "/" }) => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async userData => {
            const res = await axiosSecure.post('/user', userData);
            return res
        },
        onSuccess: (res) => {
            if (res.status === 201) {
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
