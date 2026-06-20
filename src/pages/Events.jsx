import EventList from '../components/EventList';
import bePartOfIt from '../assets/be-part-of-it.png';

// Placeholder filters — purely visual for now, no filtering logic yet.
// TODO: wire these up to real filtering when there's time.
const filters = ['All Events', 'Workshops', 'Live Music'];
const activeFilter = 'All Events';

const Events = () => {
  return (

    <div className="bg-brand-yellow py-16">

      <div className="container py-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-heading uppercase text-6xl font-medium">Events</h1>

          {/* Tagline with the badge overlapping its bottom-right. Only from lg up. */}
          <div className="relative hidden lg:block">
            <p className="flex flex-col text-right font-text text-lg text-brand-brown-dark">
              <span>Good vibes, great people,</span>
              <span>unforgettable moments.</span>
            </p>
            <img
              src={bePartOfIt}
              alt="Be part of it"
              className="absolute -right-8  xl:-right-16 top-full -mt-2 w-44"
            />
          </div>
        </div>

        {/* Filter badges (visual only) */}
        <div className="mt-8 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`badge badge-lg h-auto cursor-pointer rounded-lg border-none px-3 py-1.5 font-heading text-sm font-medium uppercase tracking-wide ${filter === activeFilter
                ? 'bg-brand-blue-dark text-white'
                : 'bg-base-100 text-brand-brown-dark'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className='mt-16'>
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default Events;
