import { Link } from 'react-router';

// One event shown as a clickable card.
// The whole card links to that event's details page (/events/:id).
const EventCard = ({ event }) => {
  // Human-friendly date, e.g. "Wed, 17 Jun 2026, 14:19".
  const formattedDate = new Date(event.date).toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Link
      to={`/events/${event.id}`}
      className="card border bg-base-100 transition hover:shadow-md"
    >
      <div className="card-body gap-2">
        <h2 className="card-title font-heading text-brand-blue">{event.title}</h2>
        <p className="font-text text-sm text-base-content/70">{formattedDate}</p>
        <p className="font-text text-sm text-base-content/70">📍 {event.location}</p>
        <p className="font-text line-clamp-2">{event.description}</p>
      </div>
    </Link>
  );
};

export default EventCard;
