import EventList from '../components/EventList';
import bePartOfIt from '../assets/be-part-of-it.png';

const Events = () => {
  return (
    // Yellow spans the full width of <main>...
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

        <div className='mt-28'>
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default Events;
