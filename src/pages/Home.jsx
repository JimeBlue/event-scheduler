import HighlightList from '../components/events/HighlightList';

const Home = () => {
  return (
    <section className="container py-12">
      <h2 className="mb-8 font-heading text-3xl font-semibold uppercase tracking-wide text-brand-blue">
        Highlights
      </h2>
      <HighlightList />
    </section>
  );
};

export default Home;
