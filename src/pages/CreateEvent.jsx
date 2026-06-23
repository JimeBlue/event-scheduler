import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';
import CreateEventHero from '../components/events/CreateEventHero';
import CreateEventModal from '../components/events/CreateEventModal';
import EventList from '../components/events/EventList';
import orangeAsterisk from '../assets/orange-asterisk.png';

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
    <div className="bg-brand-blue-dark">
      <CreateEventHero onCreate={openCreateModal} />
      <CreateEventModal />

      <div className="container py-16">
        {/* The current user's own events, listed below the create button. */}
        <section className="mt-12">
          <div className="flex items-center gap-4">
            <img
              src={orangeAsterisk}
              alt=""
              className="hidden h-20 w-20 shrink-0 object-contain sm:block"
              style={{
                WebkitMaskImage:
                  'radial-gradient(circle, black 38%, transparent 68%)',
                maskImage:
                  'radial-gradient(circle, black 38%, transparent 68%)',
              }}
              aria-hidden="true"
            />
            <h2 className="font-heading text-6xl font-medium uppercase text-white">
              My Events
            </h2>
          </div>
          <p className="mt-3 font-text text-lg text-white sm:pl-24">
            Here's what you've created. Keep the good times rolling!
          </p>
          <div className="mt-16">
            <EventList
              events={myEvents}
              emptyMessage="You haven't created any events yet."
              gridClassName="grid gap-6 lg:grid-cols-2"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateEvent;
