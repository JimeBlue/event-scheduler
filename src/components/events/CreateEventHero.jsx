import { FiPlus } from 'react-icons/fi';
import eventBoardHero from '../../assets/kv-event-board.png';

const CreateEventHero = ({ onCreate }) => {
  return (
    <section className="relative isolate min-h-[340px] overflow-hidden bg-white sm:min-h-[380px]">
      <img
        src={eventBoardHero}
        alt="A collage of conferences, live music, festivals, and event planning"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-y-0 left-0 -z-10 w-full bg-linear-to-r from-white/70 from-0% via-white/35 via-28% to-transparent to-55% sm:w-3/4 lg:w-2/3" />
      <div className="absolute inset-0 -z-10 bg-white/5" />

      <div className="container flex min-h-[340px] items-center py-12 sm:min-h-[380px]">
        <div className="max-w-md rounded-lg bg-white/88 p-6 shadow-xl shadow-brand-brown-dark/10 backdrop-blur-sm sm:p-8">
          <h1 className="font-heading text-5xl font-semibold leading-tight text-brand-brown-dark sm:text-6xl">
            Your Events,
            <span className="block text-brand-blue-dark">
              All in One Place.
            </span>
          </h1>

          <p className="mt-5 max-w-sm font-text text-base leading-relaxed text-brand-brown">
            Create, manage, and keep track of all your events. From intimate
            gatherings to big festivals.
          </p>

          <button
            type="button"
            onClick={onCreate}
            className="btn mt-8 gap-2 border-brand-blue-dark bg-brand-blue-dark uppercase text-white hover:border-brand-blue hover:bg-brand-blue"
          >
            <FiPlus className="h-4 w-4" />
            Create new event
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateEventHero;
