import { Link } from 'react-router';
import { MdCalendarMonth } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import { formatDate } from '../utils/formatDate';

// The whole card links to that event's details page (/events/:id).
const EventCard = ({ event }) => {
  const formattedDate = formatDate(event.date);

  // API has no image, so I use an event-themed placeholder from LoremFlickr.
  const imageUrl = `https://loremflickr.com/400/250/concert,festival?lock=${event.id}`;

  return (
    <Link to={`/events/${event.id}`} className="card rounded-none bg-base-100">
      <figure className="px-3 pt-3">
        <img
          src={imageUrl}
          alt={event.title}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body gap-4">
        {/* Title */}
        <h2 className="card-title font-heading text-2xl uppercase text-brand-brown-dark line-clamp-1 font-semibold">
          {event.title}
        </h2>

        {/* Date — blue, with calendar icon */}
        <p className="flex items-center gap-2 font-text text-base font-semibold uppercase tracking-normal text-brand-blue-dark">
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
