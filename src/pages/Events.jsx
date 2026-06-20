import EventList from '../components/EventList';

const Events = () => {
  return (
    // Yellow spans the full width of <main>...
    <div className="bg-brand-yellow">
      {/* ...while the container keeps the heading + cards centered and capped. */}
      <div className="container space-y-6 py-4">
        <h1 className="font-heading text-4xl">Events</h1>
        <EventList />
      </div>
    </div>
  );
};

export default Events;
