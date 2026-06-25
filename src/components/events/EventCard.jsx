import { Link, useLocation } from 'react-router';
import { MdCalendarMonth } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import { formatDate } from '../../utils/formatDate';

// The whole card links to that event's details page (/events/:id).
const EventCard = ({ event }) => {
  const location = useLocation();
  const formattedDate = formatDate(event.date);

  // API has no image, so use a placeholder from Picsum — the seed keeps each
  // event's image stable across renders.
  const imageUrl = `https://picsum.photos/seed/${event.id}/400/250`;

  return (
    <Link
      to={`/events/${event.id}`}
      state={{ from: location.pathname }}
      className="card group overflow-hidden rounded-lg bg-base-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <figure className="px-3 pt-3">
        <img
          src={imageUrl}
          alt={event.title}
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </figure>

      <div className="card-body gap-4">
        {/* Title */}
        <h2 className="card-title font-heading text-2xl uppercase tracking-wide text-brand-brown-dark line-clamp-1 font-semibold">
          {event.title}
        </h2>

        {/* Date — blue, with calendar icon */}
        <p className="flex items-center gap-2 font-heading text-base font-medium uppercase tracking-wide text-brand-blue-dark">
          <MdCalendarMonth className="size-6 shrink-0" />
          {formattedDate}
        </p>

        {/* Description */}
        <p className="font-text text-sm text-brand-brown-dark line-clamp-2">
          {event.description}
        </p>

        {/* Location — with map-pin icon */}
        <p className="flex items-start gap-2 font-text text-sm text-brand-brown-dark">
          <IoLocationSharp className="size-5 shrink-0 text-brand-blue-dark" />
          <span className="line-clamp-2">{event.location}</span>
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
