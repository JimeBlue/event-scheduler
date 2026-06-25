import { useEvents } from '../../context/EventsContext';
import HighlightCard from './HighlightCard';
import EventCardSkeleton from './EventCardSkeleton';

// Owns the loading / error / empty states for the Home highlights section and
// renders the (up to 3) upcoming events as a 3-up grid of HighlightCards.
const HighlightList = () => {
  const { upcoming, upcomingLoading, upcomingError } = useEvents();

  // Three skeletons matching the real 3-up layout while loading.
  if (upcomingLoading)
    return (
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );

  if (upcomingError)
    return (
      <p className="font-text text-error">
        Could not load highlights: {upcomingError}
      </p>
    );

  // Highlights are optional decoration — render nothing if there are none.
  if (upcoming.length === 0) return null;

  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
      {upcoming.map((event, index) => (
        <HighlightCard key={event.id} event={event} index={index} />
      ))}
    </div>
  );
};

export default HighlightList;
