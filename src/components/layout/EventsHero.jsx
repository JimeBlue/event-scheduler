import kvEventsPage from '../../assets/kv-events-page.png';
import orangeAsterisk from '../../assets/orange-asterisk.png';
import blueLine from '../../assets/blue-dotted-line-with-asterik.png';


const EventsHero = () => {
  return (
    <section className="relative overflow-hidden bg-brand-brown-dark">

      <img
        src={kvEventsPage}
        alt=""
        className="absolute inset-y-0 right-0 h-full w-full object-cover lg:w-3/5"
      />


      <div className="absolute inset-0 bg-brand-brown-dark/60 lg:bg-gradient-to-r lg:from-brand-brown-dark lg:from-30% lg:to-transparent lg:to-60%" />

      {/* Decorative marks (purely visual). */}
      <img
        src={orangeAsterisk}
        alt=""

        className="absolute left-4 top-6 w-12 lg:w-16 xl:left-[calc((100vw-1280px)/2)]"

        style={{
          WebkitMaskImage: 'radial-gradient(circle, black 38%, transparent 68%)',
          maskImage: 'radial-gradient(circle, black 38%, transparent 68%)',
        }}
      />
      <img
        src={blueLine}
        alt=""
        className="absolute bottom-0 left-2 hidden h-2/3 lg:block"
      />

      <div className="container relative flex min-h-[440px] flex-col justify-center py-20">
        <h1 className="font-heading text-5xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
          <span className="block">Discover</span>
          <span className="block">
            Every <span className="text-brand-orange">Event.</span>
          </span>
          <span className="block text-brand-blue">Anytime,</span>
          <span className="block text-brand-blue">Anywhere.</span>
        </h1>
        <p className="mt-6 max-w-md font-text text-base text-brand-cream sm:text-lg">
          From live concerts to workshops, marathons to meetups — find events
          that inspire you.
        </p>
      </div>
    </section>
  );
};

export default EventsHero;
