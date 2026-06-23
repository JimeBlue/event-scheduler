import { Link } from 'react-router';
import { FiHome, FiCalendar } from 'react-icons/fi';

import notFoundKv from '../assets/404-kv.png';
import orangeAsterisk from '../assets/orange-asterisk.png';

const NotFound = () => {
  return (
    <div className="container py-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* LEFT: copy + actions */}
        <div className="order-2 lg:order-1">
          <span className="inline-flex items-center gap-2 rounded-full bg-base-200 px-4 py-2 font-text text-sm font-medium text-brand-brown">
            <img
              src={orangeAsterisk}
              alt=""
              className="h-7 w-7 object-contain"
              aria-hidden="true"
            />
            Oops! Page not found
          </span>

          <h1 className="mt-6 font-heading text-6xl font-medium leading-tight text-brand-brown sm:text-7xl">
            Looks like
            <br />
            <span className="text-brand-blue">you&rsquo;re lost.</span>
          </h1>

          <p className="mt-6 max-w-md font-text text-lg text-brand-brown/80">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has been
            moved. Don&rsquo;t worry, let&rsquo;s get you back on track!
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/"
              className="btn gap-2 border-brand-blue-dark bg-brand-blue-dark uppercase text-white hover:border-brand-blue hover:bg-brand-blue"
            >
              <FiHome className="h-4 w-4" />
              Go Home
            </Link>
            <Link
              to="/events"
              className="btn gap-2 border-base-300 bg-white uppercase text-brand-brown hover:border-brand-blue hover:text-brand-blue"
            >
              <FiCalendar className="h-4 w-4" />
              View All Events
            </Link>
          </div>
        </div>

        {/* RIGHT: 404 key visual */}
        <div className="order-1 lg:order-2">
          <img
            src={notFoundKv}
            alt="404 — page not found"
            className="mx-auto w-full max-w-xl object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
