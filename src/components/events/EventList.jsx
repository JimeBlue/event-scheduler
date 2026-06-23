import { useEvents } from '../../context/EventsContext';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';


// Owns the loading / error / empty states.
// By default it renders every event from context (the Events page). Pass an
// `events` prop to render a specific subset instead (e.g. "my events" on the
// Create page), `emptyMessage` to tailor the empty state for that subset, and
// `gridClassName` to override the grid layout.
const EventList = ({
  events: eventsProp,
  emptyMessage = 'No events yet.',
  gridClassName = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}) => {
  const { events: allEvents, loading, error } = useEvents();
  const events = eventsProp ?? allEvents;

  // While loading, show a grid of skeleton cards matching the real layout.
  if (loading)
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );

  if (error)
    return (
      <p className="font-text text-error">Could not load events: {error}</p>
    );

  if (events.length === 0)
    return <p className="font-text">{emptyMessage}</p>;

  return (
    <div className={gridClassName}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
