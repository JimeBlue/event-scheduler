import { useEffect, useState } from 'react';
import orangeAsterisk from '../../assets/orange-asterisk.png';
import blueLine from '../../assets/blue-dotted-line-with-asterik.png';


const Hero = () => {

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  const reveal = `transition-all duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
    }`;

  return (
    <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-brand-brown-dark">
      {/* muted + playsInline are required for autoplay on mobile browsers. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/50" />


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
        className="absolute -bottom-20 left-2 hidden h-2/3 lg:block"
      />

      <div className="container relative flex h-full flex-col justify-center">
        <h1
          className={`max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl ${reveal}`}
        >
          Find events that make your heart skip a beat.
        </h1>
        <p
          className={`mt-6 max-w-2xl font-text text-lg text-white/90 sm:text-xl ${reveal}`}
          style={{ transitionDelay: '200ms' }}
        >
          Whether it’s a concert, party or theatre show – your next highlight is
          on Eventbox!
        </p>
      </div>
    </section>
  );
};

export default Hero;
