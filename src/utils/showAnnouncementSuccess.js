import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export function showAnnouncementSuccess(title) {
  MySwal.fire({
    title: `<span class="text-2xl font-bold text-green-400">Posted!</span>`,
    html: `<p class="text-gray-300">Your announcement “<strong>${title}</strong>” was created successfully.</p>`,
    icon: 'success',
    background: '#1f1f1f',
    color: '#eee',
    buttonsStyling: false,
    customClass: {
      popup: 'p-6 rounded-2xl shadow-2xl',
      title: 'mb-2',
      htmlContainer: 'mb-4',
      confirmButton: 'bg-green-600 hover:bg-green-500 focus:ring-2 focus:ring-green-400 rounded-lg px-5 py-2 text-white'
    },
    confirmButtonText: 'Awesome!',
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: true,
    showClass: { popup: 'animate__animated animate__zoomIn' },
    hideClass: { popup: 'animate__animated animate__zoomOut' }
  });
}
