import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
  position: "top-right", // Fallback to string position
  autoClose: 3000,
  pauseOnFocusLoss: true,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
};

const Notifications = (message = null, type = 'default') => {
  if (!message) return;
  toast(message, {
    ...toastConfig,
    type,
    toastId: message,
  });
};

export default Notifications;
