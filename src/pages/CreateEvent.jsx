import { FiPlus } from 'react-icons/fi';
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';
import CreateEventModal from '../components/events/CreateEventModal';
import EventList from '../components/events/EventList';

const CreateEvent = () => {
  const { openCreateModal, events } = useEvents();
  const { user } = useAuth();

  // The events this user organized: match each event's organizerId to the
  // logged-in user's id. String() guards against any number/string mismatch,
  // matching the comparison style used in EventsContext.getEventById.
  // While the profile is still loading user is null, so this stays empty.
  const myEvents = user
    ? events.filter((event) => String(event.organizerId) === String(user.id))
    : [];

  return (
    <div className="container py-16">
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

      {/* The current user's own events, listed below the create button. */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl uppercase">My Events</h2>
        <div className="mt-6">
          <EventList
            events={myEvents}
            emptyMessage="You haven't created any events yet."
            gridClassName="grid gap-6 lg:grid-cols-2"
          />
        </div>
      </section>
    </div>
  );
};

export default CreateEvent;
