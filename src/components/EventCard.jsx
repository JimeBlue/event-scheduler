import { Link } from 'react-router';
import { formatDate } from '../utils/formatDate';


// The whole card links to that event's details page (/events/:id).
const EventCard = ({ event }) => {
  const formattedDate = formatDate(event.date);

  // API has no image, I use a stable placeholder seeded by the
  // event id
  const imageUrl = `https://picsum.photos/seed/${event.id}/400/250`;

  return (
    <Link
      to={`/events/${event.id}`}
      className="card border bg-base-100 shadow-sm transition hover:shadow-md"
    >
      <figure>
        <img
          src={imageUrl}
          alt={event.title}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body gap-2">

        <h2 className="card-title font-heading text-brand-blue line-clamp-1">
          {event.title}
        </h2>


        <p className="font-text text-sm text-base-content/70">{formattedDate}</p>


        <p className="font-text line-clamp-2">{event.description}</p>


        <p className="font-text text-sm text-base-content/70">
          📍 {event.location}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
