import { FiX } from 'react-icons/fi';
import { useEvents } from '../../context/EventsContext';
import CreateEventForm from './CreateEventForm';

// daisyUI modal: visible only while `modal-open` is applied. The state lives in
// EventsContext so the page button can open it and this component can close it.
const CreateEventModal = () => {
  const { isCreateModalOpen, closeCreateModal } = useEvents();

  return (
    <div
      className={`modal ${isCreateModalOpen ? 'modal-open' : ''}`}
      role="dialog"
    >
      <div className="modal-box w-11/12 max-w-4xl">
        <button
          type="button"
          onClick={closeCreateModal}
          className="btn btn-ghost btn-sm btn-circle absolute right-2 top-2"
          aria-label="Close"
        >
          <FiX className="h-5 w-5" />
        </button>

        {/* Only mount the form while the modal is open, so each open starts
            with a fresh, empty form. */}
        {isCreateModalOpen && <CreateEventForm />}
      </div>

      {/* Click outside the box to dismiss. */}
      <div className="modal-backdrop" onClick={closeCreateModal}></div>
    </div>
  );
};

export default CreateEventModal;
