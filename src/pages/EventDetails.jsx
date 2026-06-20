import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { MdArrowBack, MdCalendarMonth } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import { useEvents } from '../context/EventsContext';
import { formatDate } from '../utils/formatDate';
import InfoRow from '../components/InfoRow';
import EventMap from '../components/EventMap';
import bePartOfIt from '../assets/be-part-of-it.png';

const EventDetails = () => {
  const { id } = useParams();
  const { getEventById } = useEvents();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the single event when the page mounts or the :id changes.
  // getEventById is cache-first: instant if the list is already in memory,
  // otherwise it hits GET /events/:id.
  useEffect(() => {
    let active = true; // guard against setting state after unmount / id change

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEventById(id);
        if (active) setEvent(data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [id, getEventById]);

  return (
    <div className="bg-brand-yellow py-16">
      <div className="container py-4">
        {/* Back link */}
        <Link
          to="/events"
          className="inline-flex items-center gap-2 font-heading text-sm font-medium uppercase tracking-wide text-brand-blue-dark hover:text-brand-blue"
        >
          <MdArrowBack className="size-5" />
          Back to events
        </Link>

        {loading && (
          <div className="mt-12 space-y-4">
            <div className="skeleton h-4 w-32"></div>
            <div className="skeleton h-14 w-2/3"></div>
            <div className="skeleton mt-8 h-96 w-full rounded-none"></div>
          </div>
        )}

        {/* Error / not-found state */}
        {!loading && error && (
          <div className="mt-12">
            <h1 className="font-heading text-4xl uppercase text-brand-brown-dark">
              Event not found
            </h1>
            <p className="mt-2 font-text text-brand-brown-dark">{error}</p>
          </div>
        )}

        {!loading && !error && event && (
          <>

            <div className="mt-8 flex items-start justify-between gap-4">
              <div>
                <p className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-orange">
                  Event Details
                </p>
                <h1 className="mt-2 font-heading text-6xl font-medium uppercase text-brand-brown-dark">
                  {event.title}
                </h1>
              </div>


              <div className="relative hidden lg:block">
                <p className="flex flex-col text-right font-text text-lg text-brand-brown-dark">
                  <span>Good vibes, great people,</span>
                  <span>unforgettable moments.</span>
                </p>
                <img
                  src={bePartOfIt}
                  alt="Be part of it"
                  className="absolute -right-8 top-full -mt-2 w-44 xl:-right-16"
                />
              </div>
            </div>

            {/* White content card */}
            <div className="mt-12 rounded-lg bg-base-100 p-6 md:p-10">

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                <div>
                  <img
                    src={`https://loremflickr.com/800/600/concert,festival?lock=${event.id}`}
                    alt={event.title}
                    className="aspect-[4/3] w-full rounded-xl object-cover"
                  />
                </div>


                <div className="flex flex-col gap-8">
                  <p className="font-text text-lg text-brand-brown-dark">
                    {event.description}
                  </p>

                  <ul className="flex flex-col gap-6">
                    <li className="border-b border-base-300 pb-6">
                      <InfoRow
                        icon={MdCalendarMonth}
                        label="Date & Time"
                        value={formatDate(event.date)}
                      />
                    </li>
                    <li>
                      <InfoRow
                        icon={IoLocationSharp}
                        label="Location"
                        value={event.location}
                      />
                    </li>
                  </ul>

                  <EventMap location={event.location} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
