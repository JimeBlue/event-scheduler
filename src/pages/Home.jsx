import Hero from '../components/layout/Hero';
import HighlightList from '../components/events/HighlightList';
import HomeCta from '../components/home/HomeCta';

const Home = () => {
  return (
    <>
      <Hero />
      <section className="bg-brand-orange py-16">
        <div className="container">
          <h2 className="mb-8 font-heading text-6xl font-medium uppercase tracking-wide text-brand-blue-dark">
            Highlights
          </h2>
          <HighlightList />
        </div>
      </section>
      <HomeCta />
    </>
  );
};

export default Home;
