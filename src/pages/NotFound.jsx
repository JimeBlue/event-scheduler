import { Link } from "react-router";

const NotFound = () => {
  return (
    <div>
      <h1 className="font-heading text-4xl">404</h1>
      <p className="font-text">This page doesn't exist.</p>
      <Link to="/" className="font-text text-brand-blue underline">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
