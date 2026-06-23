import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import { useEvents } from '../../context/EventsContext';

// Maps a toast type to its daisyUI alert colour and icon.
const variants = {
  success: { alert: 'alert-success', Icon: FiCheckCircle },
  error: { alert: 'alert-error', Icon: FiAlertCircle },
  info: { alert: 'alert-info', Icon: FiInfo },
};

// Global toast outlet: reads the current toast from context and renders it in a
// daisyUI `toast` container (bottom-right). Renders nothing when there's no
// toast. Mounted once in MainLayout so it survives the modal closing.
const Toast = () => {
  const { toast, hideToast } = useEvents();
  if (!toast) return null;

  const { alert, Icon } = variants[toast.type] ?? variants.success;

  return (
    <div className="toast toast-center toast-middle z-50">
      <div className={`alert ${alert} shadow-lg`}>
        <Icon className="h-5 w-5 shrink-0" />
        <span className="font-text">{toast.message}</span>
        <button
          type="button"
          onClick={hideToast}
          aria-label="Dismiss"
          className="btn btn-circle btn-ghost btn-xs"
        >
          <FiX className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
