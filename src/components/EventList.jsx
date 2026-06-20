import { useEvents } from '../context/EventsContext';
import EventCard from './EventCard';
import EventCardSkeleton from './EventCardSkeleton';


// Owns the loading / error / empty states
const EventList = () => {
  const { events, loading, error } = useEvents();

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

  if (events.length === 0) return <p className="font-text">No events yet.</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
