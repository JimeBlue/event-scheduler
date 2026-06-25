import { Link, useLocation } from 'react-router';
import { useInView } from 'react-intersection-observer';
import { MdCalendarMonth } from 'react-icons/md';
import { formatDate } from '../../utils/formatDate';
import orangeAsterisk from '../../assets/orange-asterisk.png';


const HighlightCard = ({ event, index = 0 }) => {
  const location = useLocation();
  const formattedDate = formatDate(event.date);

  // Reveal the card with a fade + slide-up the first time it scrolls into view;
  // the per-card delay (from index) staggers the three cards. The wrapper owns
  // this transition so it stays independent of the Link's hover transition.
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  // API has no image, so reuse EventCard's placeholder, locked by id.
  const imageUrl = `https://loremflickr.com/400/250/concert,festival?lock=${event.id}`;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <Link
        to={`/events/${event.id}`}
        state={{ from: location.pathname }}
        className="ticket-card group block bg-base-100 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
      <figure className="overflow-hidden">
        <img
          src={imageUrl}
          alt={event.title}
          className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </figure>

      <div className="ticket-body relative z-10 -mt-4 flex flex-col gap-4 bg-base-100 px-6 pb-10 pt-8">

        <h3 className="font-heading text-2xl font-semibold uppercase tracking-wide text-brand-brown-dark line-clamp-1">
          {event.title}
        </h3>


        <p className="flex items-center gap-2 font-heading text-base font-medium uppercase tracking-wide text-brand-blue-dark">
          <MdCalendarMonth className="size-6 shrink-0" />
          {formattedDate}
        </p>


        <p className="font-text text-sm text-brand-brown line-clamp-2">
          {event.description}
        </p>


        <span className="btn mt-2 w-full justify-center border-brand-blue-dark bg-brand-blue-dark text-white hover:border-brand-blue hover:bg-brand-blue">
          {/* Icon + label shifted left as a group so the label sits centered */}
          <span className="flex -translate-x-6 items-center gap-2">
            <img
              src={orangeAsterisk}
              alt=""
              className="size-10 shrink-0 object-contain"
              // Fade the PNG's square edges so no border shows (same trick as
              // the Create Event page asterisk).
              style={{
                WebkitMaskImage:
                  'radial-gradient(circle, black 38%, transparent 68%)',
                maskImage:
                  'radial-gradient(circle, black 38%, transparent 68%)',
              }}
            />
            More Details
          </span>
        </span>
      </div>
      </Link>
    </div>
  );
};

export default HighlightCard;
