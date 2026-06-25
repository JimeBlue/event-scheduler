import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FiCompass, FiPlus } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import trailGrafik from '../../assets/trail-grafik.png';
import orangeAsterisk from '../../assets/orange-asterisk.png';

// Fade the orange asterisk PNG's square edges so no border shows — same trick
// used in Hero and HighlightCard.
const fadeEdges = {
  WebkitMaskImage: 'radial-gradient(circle, black 38%, transparent 68%)',
  maskImage: 'radial-gradient(circle, black 38%, transparent 68%)',
};

const HomeCta = () => {
  const { isAuthenticated } = useAuth();

  // Fade + slide in the left column the first time it mounts (house style,
  // shared with Hero).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reveal = `transition-all duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
    mounted ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
  }`;

  // "Create event" gates on auth: logged-in users go straight to the form,
  // everyone else is sent to log in first — carrying the intended destination
  // so the login form can forward them on afterwards (mirrors Header).
  const createEventTo = isAuthenticated ? '/events/new' : '/login';
  const createEventState = isAuthenticated
    ? undefined
    : { from: { pathname: '/events/new' } };

  return (
    <section className="bg-base-100 font-heading">
      <div className="container relative grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        {/* Decorative asterisk, top-left of the section */}
        <img
          src={orangeAsterisk}
          alt=""
          className="absolute top-6 left-4 w-12 lg:w-16"
          style={fadeEdges}
        />

        {/* LEFT: heading, copy, CTAs */}
        <div className={reveal}>
          <h2 className="text-4xl font-bold uppercase leading-none text-brand-brown-dark sm:text-6xl lg:text-7xl">
            Ready for
            <br />
            something
            <br />
            <span className="text-brand-orange">unforgettable?</span>
          </h2>

          <p className="mt-6 max-w-md font-text text-lg text-brand-brown">
            Explore thousands of exciting events happening near you or create
            your own and bring people together.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/events"
              className="btn gap-2 border-brand-blue-dark bg-brand-blue-dark uppercase text-white hover:border-brand-blue hover:bg-brand-blue"
            >
              <FiCompass className="h-5 w-5 text-brand-orange" />
              Explore events
            </Link>

            <Link
              to={createEventTo}
              state={createEventState}
              className="btn gap-2 border-brand-blue-dark bg-transparent uppercase text-brand-blue-dark hover:border-brand-blue hover:bg-brand-blue hover:text-white"
            >
              <FiPlus className="h-5 w-5 text-brand-orange" />
              Create event
            </Link>
          </div>
        </div>

        {/* RIGHT: trail graphic */}
        <div className="flex justify-center lg:justify-end">
          <img
            src={trailGrafik}
            alt=""
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeCta;
