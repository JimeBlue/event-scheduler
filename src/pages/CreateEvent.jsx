import { FiPlus } from 'react-icons/fi';
import { useEvents } from '../context/EventsContext';
import CreateEventModal from '../components/events/CreateEventModal';

const CreateEvent = () => {
  const { openCreateModal } = useEvents();

  return (
    <div>
      <h1 className="font-heading text-4xl">Create Event</h1>

      <button
        type="button"
        onClick={openCreateModal}
        className="btn mt-6 gap-2 border-brand-blue-dark bg-brand-blue-dark uppercase text-white hover:border-brand-blue hover:bg-brand-blue"
      >
        <FiPlus className="h-4 w-4" />
        Create new event
      </button>

      <CreateEventModal />
    </div>
  );
};

export default CreateEvent;
