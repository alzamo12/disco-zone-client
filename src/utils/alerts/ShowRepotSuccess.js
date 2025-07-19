import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function showReportSuccess(title, description) {
    MySwal.fire({
        title: `<span class="text-green-400 font-bold text-lg">${title}</span>`,
        html: `
      <p class="text-sm text-gray-300">${description}</p>
    `,
        icon: 'success',
        background: '#0f172a',
        color: '#e2e8f0',
        timer: 2200,
        timerProgressBar: true,
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__fadeInUp',
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown',
        },
        customClass: {
            popup: 'rounded-xl shadow-lg p-6',
            title: 'mb-2',
            htmlContainer: 'mb-3 text-center',
            icon: 'text-green-400',
        },
    });
}
