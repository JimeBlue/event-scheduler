import { useEffect, useState } from 'react';


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
      {/* Darkens the video for text contrast. */}
      <div className="absolute inset-0 bg-black/50" />

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
