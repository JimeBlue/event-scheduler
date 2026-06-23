import { FiX } from 'react-icons/fi';
import { useEvents } from '../../context/EventsContext';

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

        <h2 className="font-heading text-2xl">Create Event</h2>

        {/* Placeholder — the create-event form will replace this next. */}
        <p className="font-text py-4">The create event form will go here.</p>
      </div>

      {/* Click outside the box to dismiss. */}
      <div className="modal-backdrop" onClick={closeCreateModal}></div>
    </div>
  );
};

export default CreateEventModal;
